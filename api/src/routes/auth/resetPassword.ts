import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { hashPassword } from "../../utils";
import { passwordSchema } from "../users/schemas";

export default function resetPassword() {
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
}
