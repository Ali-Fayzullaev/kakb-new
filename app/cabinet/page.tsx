"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, BarChart3, CreditCard, Settings, Bell, Lock, HelpCircle, LogIn, TrendingUp, CheckCircle2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CabinetPage() {
  const { t, language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Имитация загрузки
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1000);
  };

  const demoStats = [
    {
      icon: DollarSign,
      title: language === "ru" ? "Баланс" : "Баланс",
      value: "125 000 ₸",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: language === "ru" ? "Активных заявок" : "Белсенді өтінімдер",
      value: "12",
      color: "text-blue-600"
    },
    {
      icon: CheckCircle2,
      title: language === "ru" ? "Завершённых сделок" : "Аяқталған мәмілелер",
      value: "47",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: language === "ru" ? "Рейтинг" : "Рейтинг",
      value: "4.8/5.0",
      color: "text-amber-600"
    },
  ];
  
  const features = [
    {
      icon: User,
      title: "Личные данные",
      description: "Управление профилем, контактной информацией и документами брокера",
    },
    {
      icon: FileText,
      title: "Мои сделки",
      description: "История оформленных кредитов, статусы заявок и комиссии",
    },
    {
      icon: BarChart3,
      title: "Статистика",
      description: "Аналитика работы: объёмы, конверсия, рейтинг среди брокеров",
    },
    {
      icon: CreditCard,
      title: "Финансы",
      description: "Баланс, история платежей, вывод средств",
    },
    {
      icon: Settings,
      title: "Настройки",
      description: "Уведомления, интеграции, доступы",
    },
    {
      icon: Bell,
      title: "Уведомления",
      description: "Актуальные новости, изменения тарифов, системные сообщения",
    },
    {
      icon: Lock,
      title: "Безопасность",
      description: "Двухфакторная аутентификация, история входов",
    },
    {
      icon: HelpCircle,
      title: "Поддержка",
      description: "Обращения в службу поддержки, база знаний",
    },
  ];
  
  // Форма входа
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
        <div className="mx-auto max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.cabinet.title}</h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.loginDialog.description}
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.loginDialog.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="broker@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t.loginDialog.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {loading ? (language === "ru" ? "Вход..." : "Кіру...") : t.loginDialog.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Демо кабинет после входа
  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t.cabinet.title}</h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {language === "ru" ? "Добро пожаловать, Иванов Иван Иванович" : "Қош келдіңіз, Иванов Иван Иванович"}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
          >
            {language === "ru" ? "Выйти" : "Шығу"}
          </Button>
        </div>

        {/* Статус брокера */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{language === "ru" ? "Сертифицированный брокер" : "Сертификатталған брокер"}</h3>
                <p className="text-sm text-muted-foreground">{language === "ru" ? "Лицензия БРК-123456 • Опыт 5 лет" : "Лицензия БРК-123456 • Тәжірибе 5 жыл"}</p>
              </div>
              <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                {language === "ru" ? "Активен" : "Белсенді"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {demoStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className={`mt-2 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Возможности */}
        <div>
          <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.cabinet.features}</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-base md:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground md:text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
