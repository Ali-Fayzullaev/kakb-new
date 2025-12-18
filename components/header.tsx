"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/text-reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-primary shadow-lg overflow-x-hidden"
    >
      <div className="w-full max-w-[100vw] mx-0">
        <div className="relative flex h-24 items-center">
          {/* Logo - Positioned with slight right offset */}
         <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 sm:ml-8 md:ml-12">
  <div className="relative h-20 w-32 md:h-24 md:w-64">
    {/* Исправленный Image */}
    <img
      src="/logo.png"
      alt="КАКБ"
      className="object-contain w-full h-full"
    />
  </div>
</Link>

          {/* Mission Statement - Centered */}
          <div className="w-full flex justify-center items-start pt-0">
            <div className="hidden lg:block text-center max-w-3xl">
            <TextReveal
              text={t.mission}
              className="text-lg text-white/90 font-medium italic px-4 leading-relaxed"
            />
            </div>
          </div>

          {/* Right Side Controls - Absolute positioned on the right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 pr-4 sm:pr-6 lg:pr-8">
            {/* Language Selector with Flags - Stacked */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLanguage("kz")}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition-all ${
                  language === "kz"
                    ? "bg-white/20 ring-2 ring-white/50"
                    : "bg-white/10 hover:bg-white/15"
                }`}
                title="Қазақша"
              >
                🇰🇿
              </button>
              <button
                onClick={() => setLanguage("ru")}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition-all ${
                  language === "ru"
                    ? "bg-white/20 ring-2 ring-white/50"
                    : "bg-white/10 hover:bg-white/15"
                }`}
                title="Русский"
              >
                🇷🇺
              </button>
            </div>

            {/* Login Button */}
            <Link href="/cabinet">
              <Button
                variant="secondary"
                className="bg-accent text-white hover:bg-accent/90"
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t.login}</span>
                <span className="sm:hidden">{t.loginShort}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
