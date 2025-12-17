"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

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

export default function NewsSection() {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Показываем loading до завершения клиентской гидрации
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.news.title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {t.news.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : news.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Новостей пока нет</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden">
                {item.image && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={language === "kz" ? item.titleKz : item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform hover:scale-105"
                      unoptimized
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {(() => {
                        const date = item.publishedAt ? new Date(item.publishedAt) : new Date(item.createdAt);
                        // Используем простой формат для избежания hydration mismatch
                        return date.toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit", 
                          year: "numeric"
                        });
                      })()}
                    </span>
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    {language === "kz" ? item.titleKz : item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground md:text-base line-clamp-3">
                    {language === "kz"
                      ? item.excerptKz || item.contentKz.substring(0, 150) + "..."
                      : item.excerpt || item.content.substring(0, 150) + "..."}
                  </p>
                  <Link href={`/news/${item.id}`}>
                    <Button variant="outline" size="sm" className="group">
                      {t.common.readMore}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
