import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { verifyJWT } from "../../plugins/jwt";

export default function deleteUser() {
  server.route({
    method: "DELETE",
    url: "/v1/users/:id",
    preHandler: server.auth([verifyJWT]),
    schema: {
      params: z.object({
        id: z.string(),
      }),
      tags: ["Users"],
    },
    handler: async (request, reply) => {
      await prisma.user.delete({
        where: {
          id: request.params.id,
        },
      });
      return reply.status(200).send({ message: "User deleted" });
    },
  });
}
