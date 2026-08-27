import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/application/services/errors/user-already-exists-error";
import { RegisterUserService } from "@/application/services/register-user-service";
import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository";

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
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
