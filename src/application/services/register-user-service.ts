import { hash } from "bcryptjs";
import type { UsersRepository } from "@/application/repositories/users-repository";
import type { UserContract } from "@/contracts/user-contract";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserServiceResponse {
  user: UserContract;
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findUserByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return { user };
  }
}
