"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  titleKz: string;
  content: string;
  contentKz: string;
  excerpt?: string;
  excerptKz?: string;
  image?: string;
  author: string;
  category?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        router.push("/blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к блогу
        </Button>

        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Метаданные */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {blog.category && (
                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-accent">
                  <Tag className="h-3 w-3" />
                  {blog.category}
                </span>
              )}
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString(
                      language === "kz" ? "kk-KZ" : "ru-RU",
                      { day: "numeric", month: "long", year: "numeric" }
                    )
                  : new Date(blog.createdAt).toLocaleDateString(
                      language === "kz" ? "kk-KZ" : "ru-RU",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
              </span>
            </div>

            {/* Заголовок */}
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">
              {language === "kz" ? blog.titleKz : blog.title}
            </h1>

            {/* Изображение */}
            {blog.image && (
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={blog.image}
                  alt={language === "kz" ? blog.titleKz : blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Краткое описание */}
            {(language === "kz" ? blog.excerptKz : blog.excerpt) && (
              <p className="mb-6 text-lg font-medium text-muted-foreground">
                {language === "kz" ? blog.excerptKz : blog.excerpt}
              </p>
            )}

            {/* Полный текст */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap">
                {language === "kz" ? blog.contentKz : blog.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка назад внизу */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/blog")}
            className="w-full md:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к блогу
          </Button>
        </div>
      </div>
    </div>
  );
}
