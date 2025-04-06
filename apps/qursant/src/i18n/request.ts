import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './settings';

export default getRequestConfig(async (params: GetRequestConfigParams) => {
  // Sprawdź czy locale jest poprawne, jeśli nie użyj domyślnego
  const resolvedLocale = (
    locales.includes(params.locale as Locale) ? params.locale : defaultLocale
  ) as Locale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../content/translations/${resolvedLocale}.json`))
      .default,
    timeZone: 'Europe/Warsaw',
  };
});
