import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { verifyJWT } from "../../plugins/jwt";
import { sendEmail } from "../../plugins/nodemailer";

export default function sendResetPasswordMail() {
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
