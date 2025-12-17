"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.blog.title}</h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.blog.subtitle}
            </p>
          </div>
          <Link href="/contacts">
            <Button variant="default" className="whitespace-nowrap">
              {t.blog.askQuestion}
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Загрузка статей...</p>
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Статей пока нет</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            {blogs.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                {article.image && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt={language === "kz" ? article.titleKz : article.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      unoptimized
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    {article.category && (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                    {language === "kz" ? article.titleKz : article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground md:text-base line-clamp-3">
                    {language === "kz"
                      ? article.excerptKz || article.contentKz.substring(0, 150) + "..."
                      : article.excerpt || article.content.substring(0, 150) + "..."}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground md:text-sm">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(
                            language === "kz" ? "kk-KZ" : "ru-RU",
                            { day: "numeric", month: "long", year: "numeric" }
                          )
                        : new Date(article.createdAt).toLocaleDateString(
                            language === "kz" ? "kk-KZ" : "ru-RU",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                    </div>
                  </div>
                  <Link href={`/blog/${article.id}`}>
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
