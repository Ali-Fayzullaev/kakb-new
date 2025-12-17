"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Users2, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function AboutSection() {
  const { t } = useLanguage();
  const valueIcons = [
    Shield,      // Прозрачность и честность
    TrendingUp,  // Профессионализм
    Heart,       // Клиентоориентированность
    Users2,      // Ответственность
    Target,      // Партнёрство и доверие
    Shield       // Защита интересов участников рынка
  ];


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
        <div className="space-y-6">
          {/* Миссия */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:h-14 md:w-14">
                  <Eye className="h-6 w-6 text-white md:h-7 md:w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">{t.about.mission}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t.about.missionText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Цели */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:h-14 md:w-14">
                  <Target className="h-6 w-6 text-white md:h-7 md:w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-lg font-semibold md:text-xl">{t.about.goalsTitle}</h3>
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
                </div>
              </div>
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
