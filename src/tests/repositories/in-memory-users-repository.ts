import { randomUUID } from "node:crypto";
import type { UsersRepository } from "@/application/repositories/users-repository";
import type { UserContract, UserCreateContract } from "@/contracts/user-contract";

export class InMemoryUsersRepository implements UsersRepository {
  private users: UserContract[] = [];

  async create(data: UserCreateContract) {
    const user = { ...data, id: randomUUID(), createdAt: new Date() };

    this.users.push(user);

    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
