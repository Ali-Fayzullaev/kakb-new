import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";
import { existsSync } from "fs";

// Загружаем переменные окружения из нужного файла
if (existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else if (existsSync("production.env")) {
  dotenv.config({ path: "production.env" });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
