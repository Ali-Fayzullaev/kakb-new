# 📋 Только команды для копирования

## 1️⃣ На сервере: Генерация SSH ключа

```bash
ssh-keygen -t ed25519 -C "kakb-server@raycon.kz"
cat ~/.ssh/id_ed25519.pub
```

**Действие**: Скопируйте вывод и добавьте в GitHub:
- https://github.com/AGGIB/kakb/settings/keys
- Нажмите "Add deploy key"
- Вставьте ключ

---

## 2️⃣ Тест подключения к GitHub

```bash
ssh -T git@github.com
```

---

## 3️⃣ Установка Docker

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
sudo apt install docker-compose-plugin -y
docker --version
docker compose version
```

---

## 4️⃣ Клонирование репозитория

```bash
cd /opt
sudo git clone git@github.com:AGGIB/kakb.git
cd kakb
sudo chown -R $USER:$USER /opt/kakb
```

---

## 5️⃣ Запуск приложения

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs -f
```

---

## 6️⃣ Проверка

```bash
curl http://localhost
```

Откройте: **http://kakb.raycon.kz**

---

## 🔄 Обновление

```bash
cd /opt/kakb
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## 🛑 Остановка

```bash
docker compose down
```

---

## 📊 Мониторинг

```bash
docker compose logs -f
docker compose ps
docker stats
```

---

## 🔥 Полная очистка и перезапуск

```bash
cd /opt/kakb
docker compose down -v
docker system prune -a -f
git pull origin main
docker compose build --no-cache
docker compose up -d
docker compose logs -f
```
