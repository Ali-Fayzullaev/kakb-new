#!/bin/bash

# Скрипт для подготовки окружения к продакшену

echo "Подготовка производственного окружения..."

# Копируем production.env как .env если он не существует
if [ ! -f ".env" ] && [ -f "production.env" ]; then
    echo "Копируем production.env как .env"
    cp production.env .env
    echo "✓ production.env скопирован как .env"
fi

# Генерируем Prisma Client
echo "Генерация Prisma Client..."
npx prisma generate

# Запускаем миграции (опционально)
if [ "$1" = "--migrate" ]; then
    echo "Запуск миграций базы данных..."
    npx prisma migrate deploy
fi

# Собираем проект
echo "Сборка проекта..."
npm run build

echo "✓ Подготовка завершена!"