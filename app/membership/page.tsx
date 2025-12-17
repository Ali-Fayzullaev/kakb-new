"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, Users, Award, Briefcase, BookOpen, ShieldCheck, ArrowRight, UserCheck, Star, BarChart2, Zap, Target, GraduationCap, FileCheck, Handshake, MessageCircle, Laptop, Landmark, Settings, FileText, Scale, Megaphone, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function MembershipSection() {
  const { t } = useLanguage();
  
  const categories = [
    {
      icon: User,
      titleKey: "individual",
      features: ["personalCertification", "accessToTraining", "support"],
      entryFee: "30 000 ₸",
      annualFee: "120 000 ₸",
      downloadType: 'individual'
    },
    {
      icon: Building2,
      titleKey: "legal",
      features: ["corporateCertification", "groupTraining", "bankPartnership"],
      entryFee: "180 000 ₸",
      annualFee: "80 000 ₸",
      annualFeeSuffix: "perEmployee",
      downloadType: 'legal'
    },
    {
      icon: Users,
      titleKey: "associated",
      features: ["brokerDatabaseAccess", "industryEvents", "marketingInitiatives"],
      entryFee: "byAgreement",
      annualFee: "byAgreement",
      downloadType: 'associated'
    },
  ];

  const benefits = [
    { icon: ShieldCheck, titleKey: "officialStatus", descKey: "officialStatusDesc" },
    { icon: Briefcase, titleKey: "trustGrowth", descKey: "trustGrowthDesc" },
    { icon: Award, titleKey: "certificate", descKey: "certificateDesc" },
    { icon: UserCheck, titleKey: "professionalism", descKey: "professionalismDesc" },
  ];

  const competitiveAdvantages = [
    { icon: Star, titleKey: "marketDistinction", descKey: "marketDistinctionDesc" },
    { icon: BarChart2, titleKey: "reputationBoost", descKey: "reputationBoostDesc" },
    { icon: Users, titleKey: "leadGenAccess", descKey: "leadGenAccessDesc" },
    { icon: Zap, titleKey: "priorityInApps", descKey: "priorityInAppsDesc" },
    { icon: Target, titleKey: "targetedPromotion", descKey: "targetedPromotionDesc" },
  ];

  const professionalDevelopment = [
    { icon: GraduationCap, titleKey: "trainingAndExams", descKey: "trainingAndExamsDesc" },
    { icon: FileCheck, titleKey: "certification", descKey: "certificationDesc" },
    { icon: Handshake, titleKey: "forumsNetworking", descKey: "forumsNetworkingDesc" },
    { icon: MessageCircle, titleKey: "experienceExchange", descKey: "experienceExchangeDesc" },
  ];

  const technologicalCapabilities = [
    { icon: Laptop, titleKey: "platformAccess" },
    { icon: Landmark, titleKey: "officialBankInteraction" },
    { icon: Settings, titleKey: "processAutomation" },
  ];

  const legalSupport = [
    { icon: FileText, titleKey: "methodicalMaterials" },
    { icon: Scale, titleKey: "legalConsultation" },
    { icon: Megaphone, titleKey: "prSupport" },
    { icon: Newspaper, titleKey: "mediaPromotion" },
  ];

  const handleDownload = (downloadType: string) => {
    const filesByType: Record<string, Array<{name: string; path: string}>> = {
      individual: [
        { name: 'Заявление для физических лиц.pdf', path: '/Заявление для физических лиц.pdf' },
        { name: 'Приглашение каз рус физ лицо.pdf', path: '/Приглашение каз рус физ лицо.pdf' }
      ],
      legal: [
        { name: 'Заявление для юридических лиц.pdf', path: '/Заявление для юридических лиц.pdf' },
        { name: 'Приглашение каз рус юр лицо.pdf', path: '/Приглашение каз рус юр лицо.pdf' }
      ],
      associated: [
        { name: 'Заявление для ассоциированных членов.pdf', path: '/Заявление для ассоциированных членов.pdf' },
        { name: 'Приглашение для партнеров ассоц членов.pdf', path: '/Приглашение для партнеров ассоц членов.pdf' },
        { name: 'Серіктестерге шақыру ассоц членов.pdf', path: '/Серіктестерге шақыру ассоц членов.pdf' }
      ]
    };

    const files = filesByType[downloadType];
    if (files) {
      files.forEach((file, index) => {
        const link = document.createElement('a');
        link.href = file.path;
        link.download = file.name;
        setTimeout(() => {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, index * 300);
      });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 md:space-y-10 lg:px-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.membership.title}</h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {t.membership.subtitle}
        </p>
      </div>

      {/* Категории */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.categories}</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <cat.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle>{t.membership[cat.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {cat.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="mr-2 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{t.membership[f as keyof typeof t.membership]}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-1 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.membership.entryFee}:</span>
                    <span className="font-semibold">
                      {cat.entryFee === 'byAgreement' ? t.membership.byAgreement : cat.entryFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.membership.annualFee}:</span>
                    <span className="font-semibold">
                      {cat.annualFee === 'byAgreement' 
                        ? t.membership.byAgreement 
                        : cat.annualFee + (cat.annualFeeSuffix ? t.membership[cat.annualFeeSuffix as keyof typeof t.membership] : '')
                      }
                    </span>
                  </div>
                  <Button 
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
                    onClick={() => handleDownload(cat.downloadType)}
                  >
                    {t.membership.applyButton}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.benefits}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-lg">{t.membership[benefit.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Competitive Advantages */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.competitiveAdvantages}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {competitiveAdvantages.map((advantage, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-lg">{t.membership[advantage.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Development */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.professionalDevelopment}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {professionalDevelopment.map((item, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-lg">{t.membership[item.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Technological Capabilities */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.technologicalCapabilities}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologicalCapabilities.map((item, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-lg">{t.membership[item.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Support */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{t.membership.legalSupport}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {legalSupport.map((item, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base md:text-lg">{t.membership[item.titleKey as keyof typeof t.membership]}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
