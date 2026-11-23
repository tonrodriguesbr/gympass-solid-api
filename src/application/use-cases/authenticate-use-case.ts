import { compare } from "bcryptjs";
import type { UsersRepository } from "@/application/repositories/users-repository";
import type { UserContract } from "@/contracts/user-contract";
import { IncorrectEmailOrPasswordError } from "./errors/incorrect-email-or-password-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: UserContract;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    const doesPasswordsMatch = await compare(password, user.passwordHash);

    if (!doesPasswordsMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    return { user };
  }
}
