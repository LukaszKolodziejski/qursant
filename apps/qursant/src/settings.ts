export const locales = ['pl', 'en', 'uk'] as const;
export const defaultLocale = 'pl' as const;

export type Locale = (typeof locales)[number];
