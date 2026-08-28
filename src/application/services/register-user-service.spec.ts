import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/tests/repositories/in-memory-users-repository";
import { RegisterUserService } from "./register-user-service";

const inMemoryUsersRepository = new InMemoryUsersRepository();
const registerUserService = new RegisterUserService(inMemoryUsersRepository);

describe("[SERVICE] Register User Service", () => {
  it("should encrypt the user password on registration", async () => {
    const { user } = await registerUserService.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.passwordHash);

    expect(isPasswordHashed).toBe(true);
    expect(user.passwordHash).not.toBe("123456");
  });
});
