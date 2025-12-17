"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ArrowLeft, Eye } from "lucide-react";
import AdminGuard from "@/components/admin/admin-guard";

interface News {
  id: string;
  title: string;
  titleKz: string;
  excerpt?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

function NewsManagementContent() {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news?published=false");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;

    try {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Управление новостями</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">
            <p>Загрузка...</p>
          </div>
        ) : news.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Новостей пока нет</p>
              <Link href="/admin/news/create">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Создать первую новость
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {news.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.titleKz}</p>
                      {item.excerpt && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {item.published ? (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
                              Опубликовано
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                              Черновик
                            </span>
                          )}
                        </span>
                        <span>
                          Создано: {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/news/edit/${item.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function NewsManagement() {
  return (
    <AdminGuard>
      <NewsManagementContent />
    </AdminGuard>
  );
}
