import fastifySwagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";

export async function registerSwagger(server: FastifyInstance) {
  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Usrly API",
        description: "Documentation de l'API Usrly",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearer: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {},
      },
      security: [{ bearer: [] }],
    },
    transform: jsonSchemaTransform,
  });

  await server.register(swaggerUi, {
    routePrefix: "/api",
  });
}
