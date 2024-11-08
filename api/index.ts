import fastifyHealthcheck from "fastify-healthcheck";
import Fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { initRoutes } from "./src/routes";
import { registerSwagger } from "./src/plugins/swagger";
import { registerZodTypeProvider } from "./src/plugins/zod";

export const server = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

registerZodTypeProvider(server);

void server.register(fastifyHealthcheck);

void registerSwagger(server);

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
