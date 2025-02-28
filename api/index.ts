import fastifyHealthcheck from "fastify-healthcheck";
import Fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { initRoutes } from "./src/routes";
import { registerSwagger } from "./src/plugins/swagger";
import { registerZodTypeProvider } from "./src/plugins/zod";
import registerFastifyJWT from "./src/plugins/jwt";
import { fastifyAuth } from "@fastify/auth";
import fastifyCors from "@fastify/cors";

export const server = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

registerZodTypeProvider(server);

void server.register(fastifyHealthcheck);

void server.register(fastifyAuth);

void registerSwagger(server);
void registerFastifyJWT(server);

void server.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

server.after(() => {
  initRoutes();
});

server
  .listen({
    host: process.env.HOST,
    port: 3000,
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
