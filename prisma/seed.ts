import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создаём первого администратора
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kakb.kz' },
    update: {},
    create: {
      email: 'admin@kakb.kz',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
    },
  });

  console.log('✅ Администратор создан:', admin.email);
  console.log('📧 Email: admin@kakb.kz');
  console.log('🔑 Пароль: admin123');
  console.log('⚠️  ВАЖНО: Смени пароль после первого входа!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
