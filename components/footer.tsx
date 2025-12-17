import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-700 bg-slate-900 text-zinc-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* О компании */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-20 w-40">
                <Image
                  src="/logo.png"
                  alt="КАКБ"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-zinc-400">
              Казахстанская Ассоциация Кредитных Брокеров — профессиональное
              объединение для развития прозрачного рынка финансовых услуг.
            </p>
          </div>

          {/* Навигация */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Об Ассоциации
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Членство
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Партнёры
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <a
                  href="https://2gis.kz/astana/firm/70000001105848451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 shrink-0"
                  title="Открыть в 2ГИС"
                >
                  <svg
                    className="h-5 w-5 text-green-600 transition-colors hover:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </a>
                <span className="text-sm text-zinc-400">
                  г. Астана, пр. Республики, 34а
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-zinc-400">
                  +7 700 300 11 91
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-zinc-400">
                  co.akb.info@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Социальные сети
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-110"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white transition-transform hover:scale-110"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-700 pt-8 text-center">
          <p className="text-sm text-zinc-400">
            © {currentYear} Казахстанская Ассоциация Кредитных Брокеров. Все
            права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
