-- Включаем Row Level Security для всех таблиц
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Blog" ENABLE ROW LEVEL SECURITY;

-- Временно создаем простые политики для начала
-- (в дальнейшем можно усложнить при настройке аутентификации)

-- Политики для User: только система может управлять пользователями
CREATE POLICY "System access only for users" ON "User"
    FOR ALL
    USING (false)
    WITH CHECK (false);

-- Разрешаем приложению полный доступ через service key
-- (RLS не применяется к service_role)

-- Политики для News: публичное чтение опубликованных
CREATE POLICY "Public can read published news" ON "News"
    FOR SELECT
    USING (published = true);

-- Политики для Blog: публичное чтение опубликованных  
CREATE POLICY "Public can read published blog posts" ON "Blog"
    FOR SELECT
    USING (published = true);

-- Комментарий: Для административных операций используйте service_role key
-- который обходит RLS. Клиентский доступ будет только на чтение опубликованного контента.
