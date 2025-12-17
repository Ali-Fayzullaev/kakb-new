"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, FileText, LogOut, User } from "lucide-react";
import AdminGuard from "@/components/admin/admin-guard";

function DashboardContent() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalNews: 0,
    totalBlogs: 0,
    totalPublished: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Получаем все новости
      const newsResponse = await fetch("/api/news?published=false");
      const newsData = await newsResponse.json();
      
      // Получаем все статьи
      const blogsResponse = await fetch("/api/blog?published=false");
      const blogsData = await blogsResponse.json();
      
      const publishedCount = 
        newsData.filter((n: any) => n.published).length +
        blogsData.filter((b: any) => b.published).length;
      
      setStats({
        totalNews: newsData.length,
        totalBlogs: blogsData.length,
        totalPublished: publishedCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Админ-панель КАКБ</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{session?.user?.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Добро пожаловать!</h2>
          <p className="text-muted-foreground">
            Выберите раздел для управления контентом
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Новости */}
          <Link href="/admin/news">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Newspaper className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Новости</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Создание, редактирование и управление новостями на сайте
                </p>
                <Button className="mt-4 w-full" variant="outline">
                  Управлять новостями
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Блог */}
          <Link href="/admin/blog">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Блог</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Создание, редактирование и управление статьями блога
                </p>
                <Button className="mt-4 w-full" variant="outline">
                  Управлять блогом
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Статистика</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Всего новостей</p>
                  <p className="mt-2 text-3xl font-bold">{stats.totalNews}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Статей в блоге</p>
                  <p className="mt-2 text-3xl font-bold">{stats.totalBlogs}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Опубликовано</p>
                  <p className="mt-2 text-3xl font-bold">{stats.totalPublished}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
