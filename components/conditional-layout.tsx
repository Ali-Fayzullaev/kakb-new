"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import SectionNav from "@/components/section-nav";
import Footer from "@/components/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <>
          <Header />
          <SectionNav />
        </>
      )}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
