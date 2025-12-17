import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@kakb.kz';
  const password = 'Admin123!'; // ИЗМЕНИТЕ ПАРОЛЬ ПОСЛЕ ПЕРВОГО ВХОДА!
  const name = 'Администратор';

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Проверяем, существует ли уже админ
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('❌ Администратор с таким email уже существует!');
      return;
    }

    // Создаем админа
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      },
    });

    console.log('✅ Администратор успешно создан!');
    console.log('📧 Email:', email);
    console.log('🔑 Пароль:', password);
    console.log('\n⚠️  ВАЖНО: Измените пароль после первого входа!');
  } catch (error) {
    console.error('❌ Ошибка при создании администратора:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
