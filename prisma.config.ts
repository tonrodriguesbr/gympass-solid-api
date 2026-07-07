import { env } from "@/config/env";
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/config/db/prisma/schema.prisma",
  migrations: {
    path: "src/config/db/prisma/migrations",
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});
