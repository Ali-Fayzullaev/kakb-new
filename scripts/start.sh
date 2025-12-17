#!/bin/sh
set -e

echo "🚀 Starting KAKB application..."

# Проверка соединения с базой данных
echo "📡 Checking database connection..."
MAX_RETRIES=10
SLEEP_SECONDS=6
RETRY_COUNT=1

while true; do
  if npx prisma db push --accept-data-loss --skip-generate >/tmp/prisma-db-check.log 2>&1; then
    echo "✅ Database connection established"
    break
  fi

  if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    echo "❌ Database connection failed after $MAX_RETRIES attempts"
    cat /tmp/prisma-db-check.log
    exit 1
  fi

  echo "⏳ Database not ready yet (attempt $RETRY_COUNT/$MAX_RETRIES). Retrying in ${SLEEP_SECONDS}s..."
  sleep "$SLEEP_SECONDS"
  RETRY_COUNT=$((RETRY_COUNT + 1))
done

# Генерация Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Запуск миграций
echo "🗃️ Running database migrations..."
npx prisma db push

# Настройка Row Level Security
echo "🔒 Setting up Row Level Security..."
node scripts/setup-rls.js || echo "⚠️  RLS setup skipped or failed - continuing..."

# Запуск seed если нужно
echo "🌱 Seeding database (if needed)..."
npx prisma db seed || echo "⚠️  Seed skipped or failed - continuing..."

echo "✅ Database setup complete!"
echo "🌟 Starting Next.js application..."

# Запуск приложения
exec node server.js
