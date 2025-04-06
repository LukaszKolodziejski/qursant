export const locales = ['pl', 'en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'pl';

export const languages: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
} as const;
