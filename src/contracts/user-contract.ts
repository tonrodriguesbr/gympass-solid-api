import type { User } from "@/config/db/generated/prisma/client";
import type { UserCreateInput } from "@/config/db/generated/prisma/models";

export interface UserContract extends User {}
export interface UserCreateContract extends UserCreateInput {}
