import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { hashPassword } from "../../utils";
import { verifyJWT } from "../../plugins/jwt";
import { passwordSchema } from "./schemas";
import { createTransporter, sendEmail } from "../../plugins/nodemailer";

const createUserRequestBody = z.object({
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  birthDate: z.string().nullish(),
  password: passwordSchema,
});

export default function createUserEndpoint() {
  server.route({
    method: "POST",
    url: "/v1/users",
    preHandler: server.auth([verifyJWT]),
    schema: {
      body: createUserRequestBody,
      tags: ["Users"],
    },
    handler: async (request, reply) => {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: request.body.email,
        },
      });
      if (userAlreadyExists) {
        throw new Error("User already exists");
      }
      const cryptedPassword = await hashPassword(request.body.password);
      const user = await prisma.user.create({
        data: {
          email: request.body.email,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          birthDate: request.body.birthDate
            ? new Date(request.body.birthDate)
            : undefined,
          password: cryptedPassword,
        },
      });
      const token = server.jwt.sign({ id: user.id }, { expiresIn: "1d" });
      const resetPasswordLink = `${process.env.CLIENT_URL}#/reset-password/${token}`;
      const mailOptions = {
        from: "no-reply@usrly",
        subject: "Invitation to join Usrly",
        to: user.email,
        html: `<p>Hi ${user.firstName}, you are invited to join the Usrly application. To accept the invitation click on this <a href="${resetPasswordLink}">link</a> and create a new password</p>`,
      };

      await sendEmail(mailOptions);

      return user;
    },
  });
}
