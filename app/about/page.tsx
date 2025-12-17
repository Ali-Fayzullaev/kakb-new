"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Users2, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const valueIcons = [
    Shield,      // Прозрачность и честность
    TrendingUp,  // Профессионализм
    Heart,       // Клиентоориентированность
    Users2,      // Ответственность
    Target,      // Партнёрство и доверие
    Shield       // Защита интересов участников рынка
  ];

  // Показываем loading, пока не прошла гидрация
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
        {/* Заголовок */}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t.about.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.subtitle}
          </p>
        </div>

        {/* Миссия и Цели */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {/* Миссия */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Eye className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>
              <CardTitle className="text-lg font-semibold md:text-xl">{t.about.mission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.about.missionText}
              </p>
            </CardContent>
          </Card>

          {/* Цели */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Target className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>
              <CardTitle className="text-lg font-semibold md:text-xl">{t.about.goalsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground md:text-base">
                {Array.isArray(t.about.goals) ? (
                  t.about.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"></span>
                      <span className="leading-relaxed">{goal}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t.about.goals}
                  </p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Ценности */}
        <div>
          <h2 className="mb-6 text-xl font-bold text-foreground md:text-2xl">
            {t.about.values}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {t.about.valuesList.map((value, index) => {
              const IconComponent = valueIcons[index % valueIcons.length];
              return (
                <Card key={index} className="text-left">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
