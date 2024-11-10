import z from "zod";
import { server } from "../../..";
import { prisma } from "../../../prisma/prisma";
import { verifyJWT } from "../../plugins/jwt";
import {
  pageSchema,
  limitSchema,
  orderBySchema,
  searchTextSchema,
  getPrismaPagination,
} from "./schemas";

const querystringSchema = z.object({
  page: pageSchema,
  limit: limitSchema,
  ordering: orderBySchema.default("email"),
  email: z.string().optional(),
});
export default function getUsers() {
  server.route({
    method: "GET",
    url: "/v1/users",
    preHandler: server.auth([verifyJWT]),
    schema: {
      tags: ["Users"],
      querystring: querystringSchema,
    },
    handler: async (request, reply) => {
      const { page, limit, ordering, email } = request.query;
      const currentUser = request.user as { id: string };
      // https://github.com/prisma/prisma/issues/7550
      const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
          ...getPrismaPagination(page, limit),
          orderBy: ordering,
          where: {
            email: {
              contains: email,
              mode: "insensitive",
            },
            // exclude current user
            id: {
              not: currentUser.id,
            },
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            birthDate: true,
          },
        }),
        prisma.user.count({
          where: {
            email: {
              contains: email,
              mode: "insensitive",
            },
          },
        }),
      ]);

      return { results: users, count };
    },
  });
}
