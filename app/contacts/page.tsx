"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ContactsSection() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.contacts.title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {t.contacts.subtitle}
          </p>
        </div>

        {/* Контактная информация */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:h-14 md:w-14">
                <MapPin className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>
              <CardTitle className="text-base md:text-lg">{t.contacts.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground md:text-sm">
                {t.contacts.addressText}
                <br />
                {t.contacts.addressCity}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:h-14 md:w-14">
                <Phone className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>
              <CardTitle className="text-base md:text-lg">{t.contacts.phone}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground md:text-sm">
                +7 700 300 11 91
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:h-14 md:w-14">
                <Mail className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>
              <CardTitle className="text-base md:text-lg">{t.contacts.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground md:text-sm">co.akb.info@gmail.com</p>
            </CardContent>
          </Card>
        </div>

        {/* Мессенджеры */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{t.contacts.messengers}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button className="flex-1 bg-green-500 hover:bg-green-600">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
            <Button className="flex-1 bg-[#0088cc] hover:bg-[#0077b3]">
              <Send className="mr-2 h-5 w-5" />
              Telegram
            </Button>
          </CardContent>
        </Card>

        {/* Форма обратной связи */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{t.contacts.form}</CardTitle>
            <p className="text-xs text-muted-foreground md:text-sm">
              {t.contacts.formDescription}
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium md:text-sm">
                    {t.contacts.name}
                  </label>
                  <Input id="name" placeholder={t.contacts.namePlaceholder} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium md:text-sm">
                    {t.contacts.emailLabel}
                  </label>
                  <Input id="email" type="email" placeholder={t.contacts.emailPlaceholder} />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium md:text-sm">
                  {t.contacts.phoneOptional}
                </label>
                <Input id="phone" type="tel" placeholder={t.contacts.phonePlaceholder} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium md:text-sm">
                  {t.contacts.message}
                </label>
                <Textarea
                  id="message"
                  placeholder={t.contacts.messagePlaceholder}
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                {t.common.send}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
