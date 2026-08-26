import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUserService } from "@/application/services/register-user-service";

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBodySchema.parse(request.body);

    const { user } = await RegisterUserService.execute({ name, email, password });

    return reply.status(201).send(user);
  } catch (error) {
    console.error(error);
  }
}
