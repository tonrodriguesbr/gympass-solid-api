import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/http/repositories/prisma-users-repository";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserServiceResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export class RegisterUserService {
  constructor(private usersRepository: PrismaUsersRepository) {}

   async execute({ name, email, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findUserByEmail(email);

    if (userWithSameEmail) {
      throw new Error("User with same email already exists");
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return { user: formattedUser };
  }
}
