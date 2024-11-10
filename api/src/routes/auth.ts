import z from "zod";
import { server } from "../..";
import bcrypt from "bcryptjs";
import { prisma } from "../../prisma/prisma";
import { passwordSchema } from "./users/schemas";
import { verifyJWT } from "../plugins/jwt";
import { sendEmail } from "../plugins/nodemailer";
import { hashPassword } from "../utils";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function initAuthRoute() {
  server.route({
    method: "POST",
    url: "/v1/auth/token",
    schema: {
      body: loginSchema,
      tags: ["Auth"],
    },
    handler: async (request, reply) => {
      // find user with unique email
      const user = await prisma.user.findFirst({
        where: {
          email: request.body.email,
        },
      });

      if (!user) {
        return reply.status(401).send({ message: "User not found" });
      }

      // check password is valid
      const isPasswordValid = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid password" });
      }

      // generate token
      const token = server.jwt.sign(
        { id: user.id, email: user.email },
        { expiresIn: "30m" }
      );

      reply.send({ token });
    },
  });

  server.route({
    method: "POST",
    url: "/v1/auth/reset-password",
    schema: {
      body: z.object({
        id: z.string(),
        password: passwordSchema,
      }),
      tags: ["Auth"],
    },
    handler: async (request, reply) => {
      const userExists = await prisma.user.findFirst({
        where: {
          id: request.body.id,
        },
      });
      if (!userExists) {
        throw new Error("User not found");
      }

      const cryptedPassword = await hashPassword(request.body.password);

      await prisma.user.update({
        where: {
          id: request.body.id,
        },
        data: {
          password: cryptedPassword,
        },
      });

      reply.send({ message: "Password reset successfully" });
    },
  });

  server.route({
    method: "POST",
    url: "/v1/auth/send-reset-password-mail",
    preHandler: server.auth([verifyJWT]),
    schema: {
      body: z.object({
        id: z.string(),
      }),
      tags: ["Auth"],
    },
    handler: async (request, reply) => {
      const user = await prisma.user.findFirst({
        where: {
          id: request.body.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const token = server.jwt.sign({ id: user.id }, { expiresIn: "1d" });
      const resetPasswordLink = `${process.env.CLIENT_URL}#/reset-password/${token}`;
      const mailOptions = {
        from: "no-reply@usrly",
        subject: "Invitation to reset Usrly password",
        to: user.email,
        html: `<p>Hi ${user.firstName}, here's a link to reset your password. Click on this <a href="${resetPasswordLink}">link</a> to update your password`,
      };

      await sendEmail(mailOptions);
    },
  });
}
