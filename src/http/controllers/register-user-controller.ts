import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/application/use-cases/errors/user-already-exists-error";
import { RegisterUserUseCase } from "@/application/use-cases/register-user-use-case";
import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository";

export class RegisterUserController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6),
      });

      const { name, email, password } = createUserBodySchema.parse(request.body);

      const usersRepository = new PrismaUsersRepository();
      const registerUserUseCase = new RegisterUserUseCase(usersRepository);
      const { user } = await registerUserUseCase.execute({ name, email, password });

      return reply.status(201).send(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error;
    }
  }
}
