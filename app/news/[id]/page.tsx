"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

interface News {
  id: string;
  title: string;
  titleKz: string;
  content: string;
  contentKz: string;
  excerpt?: string;
  excerptKz?: string;
  image?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id as string);
    }
  }, [params.id]);

  const fetchNews = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else {
        router.push("/news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      router.push("/news");
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

  if (!news) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/news")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к новостям
        </Button>

        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Дата публикации */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString(
                    language === "kz" ? "kk-KZ" : "ru-RU",
                    { day: "numeric", month: "long", year: "numeric" }
                  )
                : new Date(news.createdAt).toLocaleDateString(
                    language === "kz" ? "kk-KZ" : "ru-RU",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
            </div>

            {/* Заголовок */}
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">
              {language === "kz" ? news.titleKz : news.title}
            </h1>

            {/* Изображение */}
            {news.image && (
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={news.image}
                  alt={language === "kz" ? news.titleKz : news.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Краткое описание */}
            {(language === "kz" ? news.excerptKz : news.excerpt) && (
              <p className="mb-6 text-lg font-medium text-muted-foreground">
                {language === "kz" ? news.excerptKz : news.excerpt}
              </p>
            )}

            {/* Полный текст */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap">
                {language === "kz" ? news.contentKz : news.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка назад внизу */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/news")}
            className="w-full md:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к новостям
          </Button>
        </div>
      </div>
    </div>
  );
}
