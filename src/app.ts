import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./config/env";
import { routes } from "./http/routes";

export const app = fastify();

app.register(routes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message, issues: error.issues });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Log to an external service
  }

  return reply.status(500).send({ message: "Internal server error" });
});
