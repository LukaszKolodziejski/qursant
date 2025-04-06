'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { languages, type Locale } from '@/i18n/settings';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Usuń prefix językowy z ścieżki
  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

  const currentLocale = (pathname.split('/')[1] as Locale) || 'pl';
  const currentLanguage = languages[currentLocale as Locale];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLanguage}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {Object.entries(languages).map(([locale, language]) => (
            <Link
              key={locale}
              href={`/${locale}/${pathnameWithoutLocale}`}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                currentLocale === locale ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {language}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
