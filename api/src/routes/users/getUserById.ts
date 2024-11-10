import z from "zod";
import { server } from "../../..";
import { verifyJWT } from "../../plugins/jwt";
import { prisma } from "../../../prisma/prisma";

export default function getUserById() {
  server.route({
    method: "GET",
    url: "/v1/users/:id",
    preHandler: server.auth([verifyJWT]),
    schema: {
      params: z.object({
        id: z.string(),
      }),
      tags: ["Users"],
    },
    handler: async (request, reply) => {
      const user = await prisma.user.findFirst({
        where: {
          id: request.params.id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          birthDate: true,
          password: true,
        },
      });
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      reply.send(user);
    },
  });
}
