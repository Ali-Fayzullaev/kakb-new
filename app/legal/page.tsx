"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Book, Shield, Gavel, Building2, Users, FileCheck, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "founding" | "internal" | "legislative" | "membership";

export default function LegalPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("founding");

  const tabs = [
    {
      id: "founding" as TabType,
      title: t.legal.foundingDocs,
      description: t.legal.foundingDocsDesc,
      icon: Building2,
    },
    {
      id: "internal" as TabType,
      title: t.legal.internalRegs,
      description: t.legal.internalRegsDesc,
      icon: FileCheck,
    },
    {
      id: "legislative" as TabType,
      title: t.legal.legislativeBasis,
      description: t.legal.legislativeBasisDesc,
      icon: Scale,
    },
    {
      id: "membership" as TabType,
      title: t.legal.membershipDocs,
      description: t.legal.membershipDocsDesc,
      icon: Handshake,
    },
  ];

  const foundingDocuments = [
    {
      icon: FileText,
      title: "Устав ОО Ассоциация кредитных брокеров",
      description: t.legal.charterDesc,
      date: "2024",
      file: "/documents/founding/Устав ОО Ассоциация кредитных брокеров.pdf",
    },
    {
      icon: Shield,
      title: "Справка о гос регистрации ЮЛ",
      description: t.legal.registrationCertificateDesc,
      date: "2024",
      file: "/documents/founding/Справка о гос регистрации ЮЛ каз рус.pdf",
    },
  ];

  const internalDocuments = [
    {
      icon: Book,
      title: "Регламент профессиональной этики и стандартов деятельности",
      description: t.legal.ethicsDesc,
      date: "2024",
      file: "/documents/internal/Регламент профессиональной этики и стандартов деятельности кредитных брокеров ОО «АКБ» қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Положение о членстве",
      description: t.legal.membershipDesc,
      date: "2024",
      file: "/documents/internal/Положение о членстве қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Положение о членских взносах",
      description: "Правила и размеры членских взносов",
      date: "2024",
      file: "/documents/internal/Положение о членских взносах қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Регламент дисциплинарной комиссии",
      description: "Процедуры и правила работы дисциплинарной комиссии",
      date: "2024",
      file: "/documents/internal/Регламент дисциплинарной комиссии и дисциплинарный кодекс ОО АКБ қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Регламент работы Наблюдательного совета",
      description: "Правила и процедуры работы Наблюдательного совета",
      date: "2024",
      file: "/documents/internal/Регламент работы Наблюдательного совета ОО АКБ қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Регламент работы экспертного совета",
      description: "Правила и процедуры работы экспертного совета",
      date: "2024",
      file: "/documents/internal/Регламент работы экспертного совета ОО «АКБ» қаз_рус.pdf",
    },
    {
      icon: FileCheck,
      title: "Регламент сертификации брокеров",
      description: t.legal.standardsDesc,
      date: "2024",
      file: "/documents/internal/Регламент сертификации брокеров ОО АКБ қаз_рус.pdf",
    },
  ];

  const legislativeDocuments = [
    {
      icon: Scale,
      title: "Гражданский кодекс РК",
      description: "Основной закон, регулирующий гражданско-правовые отношения",
      date: "2023",
      file: "/documents/legislative/Гражданский кодекс РК.pdf",
    },
    {
      icon: Book,
      title: "Закон О банках и банковской деятельности",
      description: "Регулирует деятельность банков и банковских организаций",
      date: "2024",
      file: "/documents/legislative/Закон О банках и банковской деятельности.pdf",
    },
    {
      icon: FileText,
      title: "Закон О защите прав потребителей",
      description: "Защита прав и интересов потребителей финансовых услуг",
      date: "2024",
      file: "/documents/legislative/Закон О защите прав потребителей.pdf",
    },
    {
      icon: Shield,
      title: "Закон О персональных данных и их защите",
      description: "Правила обработки и защиты персональных данных",
      date: "2024",
      file: "/documents/legislative/Закон О персональных данных и их защите.pdf",
    },
    {
      icon: FileText,
      title: "Закон О цифровых активах",
      description: "Регулирование цифровых активов и связанных технологий",
      date: "2024",
      file: "/documents/legislative/Закон О цифровых активах.pdf",
    },
    {
      icon: FileText,
      title: "Закон Об общественных объединениях",
      description: "Правовые основы создания и деятельности общественных объединений",
      date: "2024",
      file: "/documents/legislative/Закон Об общественных объединениях.pdf",
    },
    {
      icon: Book,
      title: "Нормативные акты АРРФР",
      description: t.legal.nbrkDesc,
      date: "2024",
      file: "/documents/legislative/Нормативные акты АРРФР.pdf",
    },
  ];

  const membershipDocuments = [
    {
      icon: FileText,
      title: "Договор о членстве",
      description: t.legal.membershipAgreementDesc,
      date: "2024",
      file: "/documents/membership/Договор о членстве қаз_рус.pdf",
    },
    {
      icon: Users,
      title: "Заявление для физических лиц",
      description: "Форма заявления для физических лиц",
      date: "2024",
      file: "/documents/membership/Заявление для физических лиц қаз_рус.pdf",
    },
    {
      icon: Building2,
      title: "Заявление для юридических лиц",
      description: "Форма заявления для юридических лиц",
      date: "2024",
      file: "/documents/membership/Заявление для юридических лиц қаз_рус.pdf",
    },
    {
      icon: Users,
      title: "Заявление для ассоциированных членов",
      description: "Форма заявления для ассоциированных членов",
      date: "2024",
      file: "/documents/membership/Заявление для ассоциированных членов қаз_рус.pdf",
    },
    {
      icon: Shield,
      title: "Согласие на сбор и обработку персональных данных",
      description: "Форма согласия на обработку персональных данных",
      date: "2024",
      file: "/documents/membership/Согласие на сбор и обработку персональных данных қаз_рус.pdf",
    },
    {
      icon: FileText,
      title: "Соглашение о конфиденциальности",
      description: "Документ о неразглашении конфиденциальной информации",
      date: "2024",
      file: "/documents/membership/Соглашение о конфиденциальности қаз_рус.pdf",
    },
  ];

  const getDocumentsByTab = (tab: TabType) => {
    switch (tab) {
      case "founding":
        return foundingDocuments;
      case "internal":
        return internalDocuments;
      case "legislative":
        return legislativeDocuments;
      case "membership":
        return membershipDocuments;
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.legal.title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {t.legal.subtitle}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-full min-h-[140px] flex-col rounded-xl border-2 p-4 text-left transition-all ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-semibold md:text-base">{tab.title}</h3>
                <p className="text-xs text-muted-foreground">{tab.description}</p>
              </button>
            );
          })}
        </div>

        {/* Documents Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {getDocumentsByTab(activeTab).map((doc, index) => (
            <Card key={index} className="flex h-full flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <doc.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                </div>
                <CardTitle className="text-lg md:text-xl">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col">
                <p className="mb-4 flex-grow text-sm text-muted-foreground md:text-base">
                  {doc.description}
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  onClick={() => {
                    // Open in a new window with PDF.js viewer to prevent download
                    const viewerUrl = `/pdfjs/web/viewer.html?file=${encodeURIComponent(doc.file)}&download=false&print=false&disabledownload=true`;
                    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t.legal.view}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
