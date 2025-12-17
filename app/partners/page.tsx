"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Landmark, Home, Shield, Laptop, ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function PartnersPage() {
  const { t } = useLanguage();
  
  const allPartners = [
    { name: "Kaspi Bank", categoryKey: "categoryBank" },
    { name: "Halyk Bank", categoryKey: "categoryBank" },
    { name: "Forte Bank", categoryKey: "categoryBank" },
    { name: "Jusan Bank", categoryKey: "categoryBank" },
    { name: "BI Group", categoryKey: "categoryDeveloper" },
    { name: "Базис-А", categoryKey: "categoryDeveloper" },
    { name: "Nomad Insurance", categoryKey: "categoryInsurance" },
    { name: "Freedom Finance", categoryKey: "categoryInsurance" },
    { name: "Kolesa Group", categoryKey: "categoryIT" },
    { name: "Chocofamily", categoryKey: "categoryIT" },
    { name: "Cerebro", categoryKey: "categoryIT" },
    { name: "HalykTech", categoryKey: "categoryIT" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t.partners.title}
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg text-muted-foreground">
            {t.partners.subtitle}
          </p>
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={() => {
                // Create temporary links for both files
                const link1 = document.createElement('a');
                link1.href = '/Приглашение для партнеров.pdf';
                link1.download = 'Приглашение для партнеров.pdf';
                
                const link2 = document.createElement('a');
                link2.href = '/Серіктестерге шақыру.pdf';
                link2.download = 'Серіктестерге шақыру.pdf';
                
                // Trigger downloads
                document.body.appendChild(link1);
                link1.click();
                document.body.removeChild(link1);
                
                // Small delay to ensure first download starts
                setTimeout(() => {
                  document.body.appendChild(link2);
                  link2.click();
                  document.body.removeChild(link2);
                }, 100);
              }}
              className="rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-semibold text-white shadow-lg hover:opacity-90 md:px-10 md:py-5 md:text-lg"
            >
              {t.partners.downloadInvitation}
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Логотипы партнёров */}
        <div className="rounded-2xl bg-secondary/30 p-6 md:p-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:mb-8 md:text-3xl">
            {t.partners.allPartners}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {allPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex h-32 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md md:h-40 md:rounded-2xl md:p-6"
              >
                <Building2 className="mb-2 h-8 w-8 text-primary md:mb-3 md:h-12 md:w-12" />
                <p className="mb-1 text-center text-xs font-semibold text-foreground md:text-sm">
                  {t.partners.ourPartner}
                </p>
                <p className="text-[10px] text-muted-foreground md:text-xs">
                  {t.partners[partner.categoryKey as keyof typeof t.partners]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="overflow-hidden bg-gradient-to-br from-primary to-accent">
          <CardContent className="p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              {t.partners.become}
            </h2>
            <p className="mb-6 text-sm text-white/90 md:mb-8 md:text-base lg:text-lg">
              {t.partners.becomeDesc}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {t.partners.contact}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
