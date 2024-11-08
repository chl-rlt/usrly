import { FastifyInstance } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";

declare module "zod" {
  interface ZodError {
    httpPart?: string;
  }
}

export function registerZodTypeProvider(server: FastifyInstance) {
  server.setValidatorCompiler(validatorCompiler);

  server.setSerializerCompiler(serializerCompiler);

  // prettify errors, from https://github.com/turkerdev/fastify-type-provider-zod/issues/26#issuecomment-1516147720
  server.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        issues: error.issues,
      });
      return;
    }

    reply.send(error);
  });
}
