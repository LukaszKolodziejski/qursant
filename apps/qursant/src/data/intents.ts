export type IntentKey =
  | 'informational'
  | 'transactional'
  | 'local'
  | 'comparative';

export type IntentDefinition = {
  key: IntentKey;
  label: string;
  titlePrefix: string;
  descriptionPrefix: string;
  defaultCta: {
    href: string;
    label: string;
  };
};

export const INTENTS: Record<IntentKey, IntentDefinition> = {
  informational: {
    key: 'informational',
    label: 'Informacyjna',
    titlePrefix: 'Poznaj',
    descriptionPrefix: 'Poznaj najważniejsze informacje',
    defaultCta: {
      href: '/pytania',
      label: 'Zobacz odpowiedzi',
    },
  },
  transactional: {
    key: 'transactional',
    label: 'Transakcyjna',
    titlePrefix: 'Zarezerwuj',
    descriptionPrefix: 'Zarezerwuj miejsce i rozpocznij kurs',
    defaultCta: {
      href: '/rezerwacja',
      label: 'Zapisz się na kurs',
    },
  },
  local: {
    key: 'local',
    label: 'Lokalna',
    titlePrefix: 'Skontaktuj się',
    descriptionPrefix: 'Skontaktuj się z nami i odwiedź w Bydgoszczy',
    defaultCta: {
      href: '/kontakt',
      label: 'Kontakt i dojazd',
    },
  },
  comparative: {
    key: 'comparative',
    label: 'Porównawcza',
    titlePrefix: 'Porównaj',
    descriptionPrefix: 'Porównaj opcje i wybierz najlepszy kurs',
    defaultCta: {
      href: '/cennik',
      label: 'Porównaj opcje',
    },
  },
};

export type PageKey = 'cennik' | 'kursy' | 'pytania' | 'kontakt';

export function getIntentMetadata(
  page: PageKey,
  intent: IntentKey
): { title: string; description: string } {
  const intentDef = INTENTS[intent];

  const pageTitleMap: Record<PageKey, string> = {
    cennik: 'Cennik kursów prawa jazdy',
    kursy: 'Kursy prawa jazdy kat. B',
    pytania: 'FAQ – pytania i odpowiedzi',
    kontakt: 'Kontakt i lokalizacja',
  };

  const pageDescMap: Record<PageKey, string> = {
    cennik:
      'Aktualne ceny kursów podstawowych i ekspresowych, płatności ratalne i usługi dodatkowe.',
    kursy:
      'Terminy, harmonogram i przebieg kursu prawa jazdy kat. B – teoria i praktyka.',
    pytania:
      'Najczęściej zadawane pytania dotyczące wymagań, egzaminów, dokumentów i opłat.',
    kontakt:
      'Godziny otwarcia, telefon, e‑mail oraz dojazd do naszej szkoły w Bydgoszczy.',
  };

  const title = `${intentDef.titlePrefix} – ${pageTitleMap[page]}`;
  const description = `${intentDef.descriptionPrefix}. ${pageDescMap[page]}`;

  return { title, description };
}
