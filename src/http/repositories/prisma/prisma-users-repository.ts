import type { UsersRepository } from "@/application/repositories/users-repository";
import type { UserCreateInput } from "@/config/db/generated/prisma/models";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
