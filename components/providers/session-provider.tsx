"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Обработка ошибок NextAuth на клиенте
    const handleError = (event: any) => {
      if (event.message && event.message.includes('CLIENT_FETCH_ERROR')) {
        console.error('NextAuth fetch error:', event);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Обновлять сессию каждые 5 минут
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
