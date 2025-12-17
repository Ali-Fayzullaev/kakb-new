# Инструкция по развертыванию КАКБ на сервере

## Предварительные требования

На сервере должны быть установлены:
- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)
- Git

## 1. Установка Docker (если не установлен)

```bash
# Обновление системы
sudo apt update
sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo apt install docker-compose-plugin -y

# Проверка установки
docker --version
docker compose version
```

## 2. Клонирование репозитория на сервер

```bash
# Переход в директорию для приложений
cd /opt

# Клонирование репозитория
sudo git clone https://github.com/AGGIB/kakb.git

# Переход в директорию проекта
cd kakb

# Права доступа (если нужно)
sudo chown -R $USER:$USER /opt/kakb
```

## 3. Настройка переменных окружения

```bash
# Создать файл .env (опционально)
cat > .env << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=http://kakb.raycon.kz
EOF
```

## 4. Сборка и запуск Docker контейнеров

```bash
# Сборка образов
docker compose build

# Запуск контейнеров в фоновом режиме
docker compose up -d

# Проверка статуса контейнеров
docker compose ps

# Просмотр логов
docker compose logs -f
```

## 5. Проверка работы

Откройте в браузере: http://kakb.raycon.kz

## 6. Полезные команды

### Остановка контейнеров
```bash
docker compose down
```

### Перезапуск после обновления кода
```bash
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Просмотр логов
```bash
# Все логи
docker compose logs -f

# Логи только Next.js приложения
docker compose logs -f kakb-website

# Логи только Nginx
docker compose logs -f nginx
```

### Очистка неиспользуемых образов
```bash
docker system prune -a
```

## 7. Настройка автообновления (опционально)

Создать скрипт для автоматического обновления:

```bash
cat > /opt/kakb/update.sh << 'EOF'
#!/bin/bash
cd /opt/kakb
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
docker system prune -f
EOF

chmod +x /opt/kakb/update.sh
```

## 8. Настройка systemd для автозапуска

```bash
sudo tee /etc/systemd/system/kakb.service > /dev/null << EOF
[Unit]
Description=KAKB Website
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/kakb
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Включение автозапуска
sudo systemctl enable kakb
sudo systemctl start kakb
```

## 9. Настройка SSL (HTTPS) - опционально

Для настройки SSL с Let's Encrypt:

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата
sudo certbot --nginx -d kakb.raycon.kz

# Автоматическое обновление сертификата
sudo certbot renew --dry-run
```

## 10. Мониторинг

### Проверка использования ресурсов
```bash
docker stats
```

### Проверка дискового пространства
```bash
df -h
docker system df
```

## Решение проблем

### Если сайт не открывается:
```bash
# Проверка статуса контейнеров
docker compose ps

# Проверка логов на ошибки
docker compose logs -f

# Проверка портов
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000
```

### Если изменения не применяются:
```bash
# Полная пересборка
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Очистка всего Docker
```bash
docker compose down -v
docker system prune -a --volumes
```

## Контакты поддержки

- Email: info@kakb.kz
- Репозиторий: https://github.com/AGGIB/kakb
