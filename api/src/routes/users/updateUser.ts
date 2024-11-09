import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { verifyJWT } from "../../plugins/jwt";
const updateUserRequestBody = z.object({
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  birthDate: z.string().nullish(),
});
export default function updateUser() {
  server.route({
    method: "PUT",
    url: "/v1/users/:id",
    preHandler: server.auth([verifyJWT]),
    schema: {
      params: z.object({
        id: z.string(),
      }),
      body: updateUserRequestBody,
      tags: ["Users"],
    },
    handler: async (request, reply) => {
      const user = await prisma.user.update({
        where: {
          id: request.params.id,
        },
        data: {
          email: request.body.email,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          birthDate: request.body.birthDate
            ? new Date(request.body.birthDate)
            : undefined,
        },
      });
      return user;
    },
  });
}
