import z from "zod";
import { server } from "../..";
import bcrypt from "bcryptjs";
import { prisma } from "../../prisma/prisma";

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
}
