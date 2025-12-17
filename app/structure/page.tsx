"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, BookOpen, Gavel, GraduationCap, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function StructurePage() {
  const { t } = useLanguage();
  
  const structureSections = [
    {
      title: t.structure.leadership,
      description: t.structure.leadershipDesc,
      icon: Users
    },
    {
      title: t.structure.supervisoryBoard,
      description: t.structure.supervisoryBoardDesc,
      icon: Eye
    },
    {
      title: t.structure.expertCouncil,
      description: t.structure.expertCouncilDesc,
      icon: BookOpen
    },
    {
      title: t.structure.disciplinaryCommission,
      description: t.structure.disciplinaryCommissionDesc,
      icon: Gavel
    },
    {
      title: t.structure.certificationCommittee,
      description: t.structure.certificationCommitteeDesc,
      icon: GraduationCap
    },
    {
      title: t.structure.digitalCommittee,
      description: t.structure.digitalCommitteeDesc,
      icon: Cpu
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
        {/* Заголовок */}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t.structure.title}
          </h1>
        </div>

        {/* Секции структуры */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {structureSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader className="p-6 flex flex-col h-full">
                  <div className="flex-shrink-0 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3">{section.title}</CardTitle>
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
