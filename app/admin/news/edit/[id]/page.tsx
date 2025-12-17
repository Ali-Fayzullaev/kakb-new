"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import AdminGuard from "@/components/admin/admin-guard";
import ImageUpload from "@/components/admin/image-upload";

function EditNewsContent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    titleKz: "",
    content: "",
    contentKz: "",
    excerpt: "",
    excerptKz: "",
    image: "",
  });

  useEffect(() => {
    // Загрузить данные новости
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title || "",
            titleKz: data.titleKz || "",
            content: data.content || "",
            contentKz: data.contentKz || "",
            excerpt: data.excerpt || "",
            excerptKz: data.excerptKz || "",
            image: data.image || "",
          });
        } else {
          alert("Не удалось загрузить новость");
          router.push("/admin/news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("Ошибка при загрузке новости");
      } finally {
        setFetching(false);
      }
    };

    fetchNews();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published,
        }),
      });

      if (response.ok) {
        alert("Новость успешно обновлена!");
        router.push("/admin/news");
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error || "Не удалось обновить новость"}`);
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Ошибка при обновлении новости");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/news">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Редактировать новость</h1>
        </div>
      </div>

      <form className="space-y-6">
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
                placeholder="Заголовок новости"
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Краткое описание</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Краткое описание новости"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="content">Содержание *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Полный текст новости"
                rows={10}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Казахская версия */}
        <Card>
          <CardHeader>
            <CardTitle>Қазақша нұсқа</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="titleKz">Тақырып *</Label>
              <Input
                id="titleKz"
                value={formData.titleKz}
                onChange={(e) => setFormData({ ...formData, titleKz: e.target.value })}
                placeholder="Жаңалықтың тақырыбы"
                required
              />
            </div>
            <div>
              <Label htmlFor="excerptKz">Краткое описание</Label>
              <Textarea
                id="excerptKz"
                value={formData.excerptKz}
                onChange={(e) => setFormData({ ...formData, excerptKz: e.target.value })}
                placeholder="Жаңалықтың қысқаша сипаттамасы"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contentKz">Содержание *</Label>
              <Textarea
                id="contentKz"
                value={formData.contentKz}
                onChange={(e) => setFormData({ ...formData, contentKz: e.target.value })}
                placeholder="Жаңалықтың толық мәтіні"
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
          >
            <Save className="mr-2 h-4 w-4" />
            Сохранить как черновик
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            Обновить и опубликовать
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EditNewsPage() {
  return (
    <AdminGuard>
      <EditNewsContent />
    </AdminGuard>
  );
}
