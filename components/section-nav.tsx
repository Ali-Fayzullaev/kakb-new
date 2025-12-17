"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import {
  Info,
  Users,
  Newspaper,
  Handshake,
  FileText,
  PenTool,
  TrendingUp,
  Phone,
  UserCircle,
  Award,
} from "lucide-react";

const sections = [
  { id: "about", icon: Info, href: "/about" },
  { id: "structure", icon: Users, href: "/structure" },
  { id: "partners", icon: Handshake, href: "/partners" },
  { id: "membership", icon: UserCircle, href: "/membership" },
  { id: "news", icon: Newspaper, href: "/news" },
  { id: "blog", icon: PenTool, href: "/blog" },
  { id: "legal", icon: FileText, href: "/legal" },
  { id: "leads", icon: TrendingUp, href: "/leads" },
  { id: "registry", icon: Award, href: "/registry" },
  { id: "contacts", icon: Phone, href: "/contacts" },
];

export default function SectionNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop Navigation - Единый прямоугольник с разделами */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="sticky top-20 z-40 hidden bg-white shadow-md md:block"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto">
            {sections.map((section) => {
              const isActive = pathname === section.href;
              const Icon = section.icon;
              const label = t.nav[section.id as keyof typeof t.nav];

              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`group relative flex flex-1 flex-col items-center gap-1 border-r border-border/30 px-2 py-3 text-center transition-all last:border-r-0 hover:bg-primary/5 lg:px-3 ${
                    isActive ? "bg-primary/5 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon className={`h-4 w-4 transition-all group-hover:scale-110 lg:h-5 lg:w-5 ${
                    isActive ? "text-primary" : ""
                  }`} />}
                  <span className="text-[10px] font-medium lg:text-xs">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Маленькие квадратики слева, всегда поверх */}
      <motion.nav
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="fixed left-0 top-28 z-50 md:hidden"
      >
        <div className="flex flex-col gap-1 rounded-r-lg bg-white/95 p-1 shadow-lg backdrop-blur-sm">
          {sections.map((section) => {
            const isActive = pathname === section.href;
            const Icon = section.icon;
            const label = t.nav[section.id as keyof typeof t.nav];

            return (
              <Link
                key={section.id}
                href={section.href}
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded-md transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-md"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
