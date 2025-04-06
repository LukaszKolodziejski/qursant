import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

// Predefiniowane hooki dla często używanych przestrzeni nazw
export function useCommonTranslations() {
  return useTranslations('common');
}

export function useMetaTranslations() {
  return useTranslations('meta');
}

export function useNavigationTranslations() {
  return useTranslations('common.navigation');
}

export function useButtonTranslations() {
  return useTranslations('common.buttons');
}
