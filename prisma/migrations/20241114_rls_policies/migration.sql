-- Enable Row Level Security для всех таблиц
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Blog" ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы User (только для админов)
CREATE POLICY "Users can view own profile" ON "User"
    FOR SELECT
    USING (auth.uid()::text = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can insert users" ON "User"
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own profile, admins can update all" ON "User"
    FOR UPDATE
    USING (auth.uid()::text = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete users" ON "User"
    FOR DELETE
    USING (auth.jwt() ->> 'role' = 'admin');

-- Политики для таблицы News (публичное чтение, админы могут редактировать)
CREATE POLICY "Anyone can view published news" ON "News"
    FOR SELECT
    USING (published = true OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can insert news" ON "News"
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update news" ON "News"
    FOR UPDATE
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete news" ON "News"
    FOR DELETE
    USING (auth.jwt() ->> 'role' = 'admin');

-- Политики для таблицы Blog (публичное чтение, админы могут редактировать)
CREATE POLICY "Anyone can view published blog posts" ON "Blog"
    FOR SELECT
    USING (published = true OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can insert blog posts" ON "Blog"
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update blog posts" ON "Blog"
    FOR UPDATE
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete blog posts" ON "Blog"
    FOR DELETE
    USING (auth.jwt() ->> 'role' = 'admin');
