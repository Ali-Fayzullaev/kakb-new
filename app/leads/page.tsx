"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Target, CheckCircle2, Star, TrendingUp, Shield, Zap, AlertCircle, MapPin, Home, Car, Briefcase, Filter, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// Карта удалена

export default function LeadsPage() {
  const { t, language } = useLanguage();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCreditType, setSelectedCreditType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Показать диалог при загрузке страницы
    setShowDialog(true);
  }, []);
  
  const leadTypes = [
    {
      icon: DollarSign,
      titleKey: "unsecured",
      descKey: "unsecuredDesc",
      relevance: "300",
      conversion: "15-25%",
    },
    {
      icon: Home,
      titleKey: "mortgage",
      descKey: "mortgageDesc",
      relevance: "500",
      conversion: "20-30%",
    },
    {
      icon: RefreshCw,
      titleKey: "refinance",
      descKey: "refinanceDesc",
      relevance: "200",
      conversion: "25-35%",
    },
    {
      icon: Car,
      titleKey: "secured",
      descKey: "securedDesc",
      relevance: "700",
      conversion: "18-28%",
    },
    {
      icon: Briefcase,
      titleKey: "business",
      descKey: "businessDesc",
      relevance: "150",
      conversion: "10-20%",
      compact: true,
    },
  ];

  const cities = [
    { value: "all", label: language === "ru" ? "Все города" : "Барлық қалалар" },
    { value: "almaty", label: language === "ru" ? "Алматы" : "Алматы" },
    { value: "astana", label: language === "ru" ? "Астана" : "Астана" },
    { value: "shymkent", label: language === "ru" ? "Шымкент" : "Шымкент" },
    { value: "karaganda", label: language === "ru" ? "Караганда" : "Қарағанды" },
    { value: "aktobe", label: language === "ru" ? "Актобе" : "Ақтөбе" },
  ];

  const creditTypes = [
    { value: "all", label: language === "ru" ? "Все виды" : "Барлық түрлері" },
    { value: "unsecured", label: language === "ru" ? "Беззалоговый" : "Кепілсіз" },
    { value: "mortgage", label: language === "ru" ? "Ипотека" : "Ипотека" },
    { value: "secured", label: language === "ru" ? "Залоговый" : "Кепілді" },
    { value: "business", label: language === "ru" ? "ИП/ТОО" : "ЖК/ЖШС" },
  ];

  const advantages = [
    {
      icon: CheckCircle2,
      titleKey: "verified",
      descKey: "verifiedDesc",
    },
    {
      icon: Star,
      titleKey: "highConversion",
      descKey: "highConversionDesc",
    },
    {
      icon: Shield,
      titleKey: "guarantee",
      descKey: "guaranteeDesc",
    },
    {
      icon: Zap,
      titleKey: "fast",
      descKey: "fastDesc",
    },
  ];
  
  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" /> 
              {t.common.inDevelopment}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ru' ? 
                "Данный раздел находится в разработке. Некоторые функции могут быть недоступны или работать некорректно." : 
                "Бұл бөлім әзірленуде. Кейбір функциялар қол жетімсіз немесе дұрыс жұмыс істемеуі мүмкін."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>{language === 'ru' ? "Понятно" : "Түсінікті"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.leads.title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {t.leads.subtitle}
          </p>
        </div>

        {/* Фильтры */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {language === "ru" ? "Фильтры" : "Сүзгілер"}
                </Button>
                <Button 
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  {language === "ru" ? "Найти лиды" : "Лидтерді табу"}
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ru" ? "Город" : "Қала"}
                    </label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ru" ? "Вид кредитования" : "Несие түрі"}
                    </label>
                    <Select value={selectedCreditType} onValueChange={setSelectedCreditType}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {creditTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {leadTypes.map((lead, index) => (
            <Card key={index} className={lead.compact ? "lg:col-span-2" : ""}>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <lead.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t.leads[lead.titleKey as keyof typeof t.leads]}</CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${lead.compact ? "md:flex md:items-center md:justify-between md:space-y-0" : ""}`}>
                <p className="text-sm text-muted-foreground md:text-base">
                  {t.leads[lead.descKey as keyof typeof t.leads]}
                </p>
                <div className={`flex items-center ${lead.compact ? "gap-6" : "justify-between"} rounded-lg bg-secondary/50 p-3`}>
                  <div>
                    <p className="text-xs text-muted-foreground">{language === "ru" ? "Актуальность заявок" : "Өтінімдердің өзектілігі"}</p>
                    <p className="text-3xl font-bold text-primary md:text-4xl">{lead.relevance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t.leads.conversion}</p>
                    <p className="text-base font-semibold text-green-600 md:text-lg">{lead.conversion}</p>
                  </div>
                </div>
                <Button className={`bg-primary hover:bg-primary/90 ${lead.compact ? "md:w-auto" : "w-full"}`}>
                  {t.leads.order}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{t.leads.advantages}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <advantage.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold md:text-lg">{t.leads[advantage.titleKey as keyof typeof t.leads]}</h3>
                    <p className="text-xs text-muted-foreground md:text-sm">{t.leads[advantage.descKey as keyof typeof t.leads]}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Карта была удалена */}
        
        <Card className="bg-gradient-to-br from-primary to-accent">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              {t.leads.startToday}
            </h2>
            <p className="mb-6 text-sm text-white/90 md:text-base">
              {t.leads.bonus}
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              {t.leads.register}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
