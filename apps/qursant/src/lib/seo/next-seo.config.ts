import { Locale } from '@/i18n/settings';
import { Metadata } from 'next';

type SeoConfigProps = {
  locale: Locale;
  url: string;
  title?: string;
  description?: string;
  keywords?: string;
};

export const generateSeoConfig = ({
  locale,
  url,
  title,
  description,
  keywords,
}: SeoConfigProps): Metadata => {
  const baseUrl = 'https://qursant.pl';
  const defaultTitle =
    locale === 'pl'
      ? 'Qursant - Szkoła Jazdy w Bydgoszczy'
      : locale === 'en'
      ? 'Qursant - Driving School in Bydgoszcz'
      : 'Qursant - Автошкола в Бидгощі';
  const defaultDescription =
    locale === 'pl'
      ? 'Profesjonalna szkoła jazdy w Bydgoszczy. Kursy na prawo jazdy kategorii A, B, C i D. Doświadczeni instruktorzy, wysokie wyniki zdawalności.'
      : locale === 'en'
      ? 'Professional driving school in Bydgoszcz. Courses for driving license categories A, B, C and D. Experienced instructors, high pass rates.'
      : 'Професійна автошкола в Бидгощі. Курси на водійські права категорій A, B, C та D. Досвідчені інструктори, високий рівень здачі іспитів.';
  const defaultKeywords =
    locale === 'pl'
      ? 'szkoła jazdy, prawo jazdy, kurs prawa jazdy, nauka jazdy, Bydgoszcz'
      : locale === 'en'
      ? "driving school, driver's license, driving course, driving lessons, Bydgoszcz"
      : 'автошкола, водійські права, курс водіння, уроки водіння, Бидгощ';

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    alternates: {
      canonical: url,
      languages: {
        pl: `${baseUrl}${locale === 'pl' ? '' : '/pl'}`,
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'uk' ? 'uk_UA' : locale === 'en' ? 'en_GB' : 'pl_PL',
      url,
      title: title || defaultTitle,
      description: description || defaultDescription,
      siteName: 'Qursant',
      images: [
        {
          url: `${baseUrl}/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Qursant - Szkoła Jazdy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
    keywords: keywords || defaultKeywords,
    authors: [{ name: 'Qursant' }],
  };
};
