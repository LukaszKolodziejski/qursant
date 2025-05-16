import { Metadata } from 'next';

type SeoConfigProps = {
  url: string;
  title?: string;
  description?: string;
  keywords?: string;
};

export const generateSeoConfig = ({
  url,
  title,
  description,
  keywords,
}: SeoConfigProps): Metadata => {
  const baseUrl = 'https://qursant.pl';
  const defaultTitle = 'Qursant - Szkoła Jazdy w Bydgoszczy';
  const defaultDescription =
    'Profesjonalna szkoła jazdy w Bydgoszczy. Kursy na prawo jazdy kategorii A, B, C i D. Doświadczeni instruktorzy, wysokie wyniki zdawalności.';
  const defaultKeywords =
    'szkoła jazdy, prawo jazdy, kurs prawa jazdy, nauka jazdy, Bydgoszcz';

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    alternates: {
      canonical: url,
      languages: {
        pl: `${baseUrl}`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
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
