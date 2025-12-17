import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Загружаем переменные окружения из нужного файла
if (existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else if (existsSync('production.env')) {
  dotenv.config({ path: 'production.env' });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
