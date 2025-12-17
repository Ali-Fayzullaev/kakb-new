const { PrismaClient } = require('@prisma/client');

async function setupRLS() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔒 Setting up Row Level Security...');
    
    // Включаем RLS для всех таблиц
    await prisma.$executeRaw`ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;`;
    await prisma.$executeRaw`ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;`;
    await prisma.$executeRaw`ALTER TABLE "Blog" ENABLE ROW LEVEL SECURITY;`;
    
    console.log('✅ RLS enabled for all tables');
    
    // Drop existing policies if they exist
    await prisma.$executeRaw`DROP POLICY IF EXISTS "Public can read published news" ON "News";`;
    await prisma.$executeRaw`DROP POLICY IF EXISTS "Public can read published blog posts" ON "Blog";`;
    await prisma.$executeRaw`DROP POLICY IF EXISTS "System access only for users" ON "User";`;
    
    // Создаем политики для News
    await prisma.$executeRaw`
      CREATE POLICY "Public can read published news" ON "News"
      FOR SELECT
      USING (published = true);
    `;
    
    // Создаем политики для Blog  
    await prisma.$executeRaw`
      CREATE POLICY "Public can read published blog posts" ON "Blog"
      FOR SELECT
      USING (published = true);
    `;
    
    // Создаем политики для User (только система)
    await prisma.$executeRaw`
      CREATE POLICY "System access only for users" ON "User"
      FOR ALL
      USING (false)
      WITH CHECK (false);
    `;
    
    console.log('✅ RLS policies created successfully');
    console.log('ℹ️  Admin operations should use service_role key which bypasses RLS');
    
  } catch (error) {
    console.error('❌ Error setting up RLS:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupRLS()
    .then(() => {
      console.log('🎉 RLS setup completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 RLS setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupRLS };
