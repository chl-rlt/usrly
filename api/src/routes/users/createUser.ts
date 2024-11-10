import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { hashPassword } from "../../utils";
import { verifyJWT } from "../../plugins/jwt";
import { passwordSchema } from "./schemas";

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
      return user;
    },
  });
}
