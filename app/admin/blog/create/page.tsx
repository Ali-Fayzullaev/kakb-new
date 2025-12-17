"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import AdminGuard from "@/components/admin/admin-guard";
import ImageUpload from "@/components/admin/image-upload";

function CreateBlogContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    titleKz: "",
    content: "",
    contentKz: "",
    excerpt: "",
    excerptKz: "",
    image: "",
    author: "",
    category: "",
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, published: publish }),
      });

      if (response.ok) {
        router.push("/admin/blog");
      } else {
        alert("Ошибка при создании статьи");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Ошибка при создании статьи");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Создать статью</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <form>
          <div className="space-y-6">
            {/* Метаданные */}
            <Card>
              <CardHeader>
                <CardTitle>Информация о статье</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Автор *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Имя автора"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Например: Финансы, Кредиты, Новости"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Русская версия */}
            <Card>
              <CardHeader>
                <CardTitle>Русская версия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Введите заголовок"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Краткое описание</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Краткое описание статьи"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Содержание *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Полный текст статьи"
                    rows={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Казахская версия */}
            <Card>
              <CardHeader>
                <CardTitle>Казахская версия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="titleKz">Заголовок *</Label>
                  <Input
                    id="titleKz"
                    value={formData.titleKz}
                    onChange={(e) => setFormData({ ...formData, titleKz: e.target.value })}
                    placeholder="Тақырыпты енгізіңіз"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="excerptKz">Краткое описание</Label>
                  <Textarea
                    id="excerptKz"
                    value={formData.excerptKz}
                    onChange={(e) => setFormData({ ...formData, excerptKz: e.target.value })}
                    placeholder="Мақаланың қысқаша сипаттамасы"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="contentKz">Содержание *</Label>
                  <Textarea
                    id="contentKz"
                    value={formData.contentKz}
                    onChange={(e) => setFormData({ ...formData, contentKz: e.target.value })}
                    placeholder="Мақаланың толық мәтіні"
                    rows={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Изображение */}
            <Card>
              <CardHeader>
                <CardTitle>Изображение</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Загрузите изображение в высоком качестве (без сжатия)
                </p>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  disabled={loading}
                />
              </CardContent>
            </Card>

            {/* Действия */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading}
                className="flex-1"
              >
                Сохранить как черновик
              </Button>
              <Button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                Опубликовать
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function CreateBlog() {
  return (
    <AdminGuard>
      <CreateBlogContent />
    </AdminGuard>
  );
}
