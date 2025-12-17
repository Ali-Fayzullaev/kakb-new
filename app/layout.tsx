import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/conditional-layout";
import { LanguageProvider } from "@/contexts/language-context";
import NextAuthProvider from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "КАКБ — Казахстанская Ассоциация Кредитных Брокеров",
  description: "Единая профессиональная площадка для брокеров, банков и потребителей. Стандарты. Доверие. Защита. Партнерство.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-background`}>
        <NextAuthProvider>
          <LanguageProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
