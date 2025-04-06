export const locales = ['pl', 'en', 'ua'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'pl';

export const languages: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
  ua: 'Українська',
} as const;
