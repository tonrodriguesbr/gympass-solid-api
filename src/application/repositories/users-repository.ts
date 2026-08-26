import type { UserContract, UserCreateContract } from "@/contracts/user-contract";

export interface UsersRepository {
  create(data: UserCreateContract): Promise<UserContract>;
  findUserByEmail(email: string): Promise<UserContract | null>;
}
