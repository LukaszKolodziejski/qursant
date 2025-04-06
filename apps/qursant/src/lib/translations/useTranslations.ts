import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

export function useCommonTranslations() {
  return useTranslations('common');
}

export function useMetaTranslations() {
  return useTranslations('meta');
}
