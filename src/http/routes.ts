import type { FastifyInstance } from "fastify";
import { RegisterUserController } from "./controllers/register-user-controller";

export async function routes(app: FastifyInstance) {
  app.post("/users", RegisterUserController.handle);
}
