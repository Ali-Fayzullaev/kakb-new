# 🚀 Быстрое развертывание на сервере

## Команды для выполнения на сервере

### 1. Подключение к серверу
```bash
ssh your_user@your_server_ip
```

### 2. Клонирование репозитория
```bash
cd /opt
sudo git clone https://github.com/AGGIB/kakb.git
cd kakb
sudo chown -R $USER:$USER /opt/kakb
```

### 3. Запуск приложения
```bash
# Сборка и запуск
docker compose up -d

# Проверка статуса
docker compose ps

# Просмотр логов
docker compose logs -f
```

### 4. Проверка
Откройте в браузере: **http://kakb.raycon.kz**

---

## Обновление после изменений

```bash
cd /opt/kakb
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## Проверка логов при проблемах

```bash
# Все логи
docker compose logs -f

# Только Next.js
docker compose logs -f kakb-website

# Только Nginx
docker compose logs -f nginx
```

---

## Остановка приложения

```bash
docker compose down
```

---

📖 Полная документация: [DEPLOYMENT.md](./DEPLOYMENT.md)
