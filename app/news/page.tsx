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

  useEffect(() => {
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
          <div className="text-center py-12">
            <p className="text-lg">Загрузка новостей...</p>
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
                      className="object-cover transition-transform hover:scale-105"
                      unoptimized
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            language === "kz" ? "kk-KZ" : "ru-RU",
                            { day: "numeric", month: "long", year: "numeric" }
                          )
                        : new Date(item.createdAt).toLocaleDateString(
                            language === "kz" ? "kk-KZ" : "ru-RU",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
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
