import { defineConfig } from "prisma/config";
import { env } from "./src/config/env";

export default defineConfig({
  schema: "src/config/db/prisma/schema.prisma",
  migrations: {
    path: "src/config/db/prisma/migrations",
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});
