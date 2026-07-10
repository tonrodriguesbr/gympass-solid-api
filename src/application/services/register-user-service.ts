import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/http/repositories/prisma-users-repository";
import { prisma } from "@/lib/prisma";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUserService({ name, email, password }: RegisterUserServiceRequest) {
  const prismaUsersRepository = new PrismaUsersRepository();

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error("User with same email already exists");
  }

  const passwordHash = await hash(password, 6);

  const user = await prismaUsersRepository.create({
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
