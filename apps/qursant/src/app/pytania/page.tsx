import { Metadata } from 'next';
import PytaniaContent from '@/components/pages/PytaniaContent';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// FAQ = OGROMNA szansa na Rich Snippets w Google!
// FAQPage schema = Google pokazuje pytania bezpośrednio w wynikach
// ===================================================================

// Meta tags dla SEO
export const metadata: Metadata = {
  title: 'Najczęściej Zadawane Pytania - Szkoła Jazdy Qursant Bydgoszcz | FAQ',
  description:
    'Odpowiedzi na najczęściej zadawane pytania o kurs prawa jazdy ➤ Ile trwa kurs? ➤ Ile kosztuje? ➤ Jak się zapisać? ➤ Egzaminy ➤ Wymagane dokumenty',
  keywords:
    'faq szkoła jazdy, pytania prawo jazdy, ile kosztuje kurs, jak długo trwa kurs, dokumenty do kursu, egzamin prawo jazdy',
  openGraph: {
    title: 'FAQ - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Znajdź odpowiedzi na najczęściej zadawane pytania o kurs prawa jazdy w Bydgoszczy.',
    url: 'https://www.qursant.com.pl/pytania',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.qursant.com.pl/pytania',
  },
};

export default function PytaniaPage() {
  // FAQPage Schema - MEGA WAŻNE dla Rich Snippets!
  // Google pokaże te pytania bezpośrednio w wynikach wyszukiwania
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ile kosztuje kurs prawa jazdy w Bydgoszczy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Koszt kursu prawa jazdy kategorii B w Bydgoszczy wynosi od 2800 zł. W szkole Qursant oferujemy przejrzysty cennik bez ukrytych kosztów. Cena obejmuje zajęcia teoretyczne, minimum 30 godzin jazd praktycznych oraz materiały szkoleniowe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ile trwa kurs na prawo jazdy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kurs prawa jazdy kategorii B trwa od 2 do 4 miesięcy w zależności od częstotliwości jazd i tempa nauki. Zajęcia teoretyczne to 30 godzin lekcyjnych, a jazdy praktyczne to minimum 30 godzin zegarowych.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jakie dokumenty potrzebne są do zapisu na kurs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Do zapisu na kurs potrzebujesz: dowodu osobistego, orzeczenia lekarskiego i psychologicznego, profilu kandydata na kierowcę (PKK) oraz 3 zdjęć. Pomożemy Ci w całym procesie zapisów w szkole Qursant.',
        },
      },
      {
        '@type': 'Question',
        name: 'Od jakiego wieku można zacząć kurs na prawo jazdy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kurs na prawo jazdy kategorii B możesz rozpocząć po ukończeniu 17 lat i 9 miesięcy. Egzamin państwowy możesz zdawać po ukończeniu 18 roku życia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak wygląda egzamin na prawo jazdy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Egzamin składa się z dwóch części: teoretycznej (32 pytania testowe, potrzebujesz minimum 68 punktów) i praktycznej (jazda po mieście z egzaminatorem trwająca 35 minut). W szkole Qursant dokładnie przygotowujemy do obu części egzaminu.',
        },
      },
      {
        '@type': 'Question',
        name: 'Czy można płacić za kurs w ratach?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tak, w szkole Qursant oferujemy możliwość rozłożenia płatności za kurs na raty. Szczegóły ustalane są indywidualnie podczas zapisu.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gdzie odbywają się zajęcia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zajęcia teoretyczne odbywają się w naszej siedzibie przy ul. Ujejskiego 46a w Bydgoszczy (Wzgórze Wolności). Jazdy praktyczne rozpoczynamy w dogodnym dla Ciebie miejscu.',
        },
      },
    ],
  };

  return (
    <>
      {/* FAQPage Schema - Rich Snippets! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Client Component z interaktywnymi accordionami */}
      <PytaniaContent />
    </>
  );
}
