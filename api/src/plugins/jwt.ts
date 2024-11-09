import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { server } from "../..";

export default function registerFastifyJWT(server: FastifyInstance) {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? "supersecret",
  });
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.send(err);
  }
}
