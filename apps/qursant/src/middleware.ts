import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

// Konfiguracja next-intl middleware
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Matcher dla middleware:
// - '/' -> polska wersja (bez prefiksu)
// - '/en/*' -> angielska wersja
// - '/uk/*' -> ukraińska wersja
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
