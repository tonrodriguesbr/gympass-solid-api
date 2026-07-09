import type { FastifyInstance } from "fastify";
import { registerUserController } from "./controllers/register-user-controller";

export async function routes(app: FastifyInstance) {
  app.post("/users", registerUserController);
}
