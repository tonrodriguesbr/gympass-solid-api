import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUserService } from "@/application/services/register-user-service";
import { PrismaUsersRepository } from "@/http/repositories/prisma-users-repository";

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBodySchema.parse(request.body);

    const usersRepository = new PrismaUsersRepository();
    const registerUserService = new RegisterUserService(usersRepository);
    const { user } = await registerUserService.execute({ name, email, password });

    return reply.status(201).send(user);
  } catch (error) {
    console.error(error);
  }
}
