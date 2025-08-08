export type PoradnikCategory =
  | 'Egzamin'
  | 'Kursy i tryby'
  | 'Cennik i finansowanie'
  | 'Jazdy doszkalające'
  | 'Formalności';

export type FaqItem = {
  question: string;
  answer: string;
};

export type PoradnikArticle = {
  slug: string;
  title: string;
  category: PoradnikCategory;
  excerpt: string;
  content: string;
  tags?: string[];
  faq?: FaqItem[];
};

export const poradnikArticles: PoradnikArticle[] = [
  {
    slug: 'jak-zapisac-sie-na-kurs-prawa-jazdy',
    title: 'Jak zapisać się na kurs prawa jazdy — krok po kroku',
    category: 'Formalności',
    excerpt:
      'Poznaj prostą ścieżkę zapisu na kurs prawa jazdy kategorii B w Bydgoszczy — dokumenty, badania, terminy i płatności.',
    content:
      'Aby zapisać się na kurs prawa jazdy, przygotuj: dowód osobisty, numer PKK, orzeczenie lekarskie. Następnie wybierz dogodny termin zajęć teoretycznych i praktycznych. W Qursant pomagamy w kompletowaniu formalności i elastycznie dopasowujemy harmonogram jazd. Zapiszesz się online lub w biurze. Po ukończeniu teorii umawiamy praktykę, a na koniec wspieramy w przygotowaniu do egzaminu państwowego.',
    tags: ['zapis', 'pkk', 'badania', 'formalnosci'],
    faq: [
      {
        question: 'Czy mogę zapisać się online?',
        answer:
          'Tak. Skorzystaj z formularza rezerwacji na stronie /rezerwacja lub zadzwoń do nas.',
      },
      {
        question: 'Jak zdobyć numer PKK?',
        answer:
          'Numer PKK uzyskasz w wydziale komunikacji po złożeniu wniosku i badań lekarskich.',
      },
    ],
  },
  {
    slug: 'ile-kosztuje-kurs-prawa-jazdy-bydgoszcz',
    title: 'Ile kosztuje kurs prawa jazdy w Bydgoszczy?',
    category: 'Cennik i finansowanie',
    excerpt:
      'Sprawdź aktualne ceny kursów kat. B, opcje płatności ratalnych oraz dodatkowe koszty (badania, egzaminy).',
    content:
      'Cena kursu podstawowego kat. B wynosi 3350 zł, ekspresowego 4150 zł. Badanie lekarskie około 200 zł. Oferujemy elastyczne płatności i promocje sezonowe. Dokładny cennik znajdziesz na stronie /cennik, a zapisy przyjmujemy przez /rezerwacja.',
    tags: ['cennik', 'finansowanie', 'ratalnie'],
  },
  {
    slug: 'jak-zdac-egzamin-na-prawo-jazdy',
    title: 'Jak zdać egzamin na prawo jazdy — praktyczne wskazówki',
    category: 'Egzamin',
    excerpt:
      'Zbiór najważniejszych wskazówek egzaminacyjnych: przygotowanie pojazdu, manewry i trasa w Bydgoszczy.',
    content:
      'Kluczem do zdania egzaminu jest systematyczna praktyka na trasach egzaminacyjnych, opanowanie manewrów oraz praca nad stresem. Instruktorzy Qursant ćwiczą z kursantami realne scenariusze, a przed egzaminem organizujemy jazdy powtórkowe. Sprawdź najczęstsze błędy i checklistę przygotowania.',
    tags: ['egzamin', 'trasy', 'manewry'],
  },
  {
    slug: 'jazdy-doszkalajace-bydgoszcz',
    title: 'Jazdy doszkalające w Bydgoszczy — dla kogo i jak wyglądają?',
    category: 'Jazdy doszkalające',
    excerpt:
      'Dodatkowe godziny z instruktorem pomagają odświeżyć umiejętności i przygotować się do egzaminu lub bezpiecznej jazdy.',
    content:
      'Jazdy doszkalające to elastyczne pakiety godzin z doświadczonym instruktorem. Skupiamy się na Twoich brakach — parkowanie, łuki, rondo, trasy egzaminacyjne. Zarezerwuj termin telefonicznie lub przez /rezerwacja. Ceny pojedynczej godziny znajdziesz na /cennik.',
    tags: ['doszkalanie', 'praktyka'],
  },
  {
    slug: 'tryby-kursow-standard-vs-ekspres',
    title: 'Tryby kursów: standard vs ekspres — co wybrać?',
    category: 'Kursy i tryby',
    excerpt:
      'Porównanie trybu standardowego i ekspresowego: czas trwania, intensywność, dla kogo i jakie korzyści.',
    content:
      'Tryb standard to równomierny rozkład teorii i praktyki. Ekspres pozwala ukończyć kurs szybciej dzięki większej intensywności zajęć. Wybór zależy od dostępności czasowej i preferencji nauki. Skontaktuj się z nami, aby doradzimy najlepszą ścieżkę.',
    tags: ['kursy', 'ekspresowy', 'standard'],
  },
];

export const poradnikCategories: PoradnikCategory[] = [
  'Egzamin',
  'Kursy i tryby',
  'Cennik i finansowanie',
  'Jazdy doszkalające',
  'Formalności',
];
