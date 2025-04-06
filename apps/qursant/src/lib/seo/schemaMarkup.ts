import { Locale } from '@/i18n/settings';

type SchemaOrgProps = {
  locale: Locale;
  url: string;
};

export const generateSchemaOrgMarkup = ({ locale, url }: SchemaOrgProps) => {
  const baseUrl = 'https://qursant.pl';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/#organization`,
    name: 'Qursant',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo/logo.png`,
      width: '120',
      height: '40',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Przykładowa 123',
      addressLocality: 'Bydgoszcz',
      postalCode: '00-000',
      addressCountry: 'PL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48 123 456 789',
      email: 'kontakt@qursant.pl',
      contactType: 'customer service',
    },
    sameAs: ['https://facebook.com/qursant', 'https://instagram.com/qursant'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Qursant - Szkoła Jazdy w Bydgoszczy',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: locale,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': url,
          name:
            locale === 'pl'
              ? 'Strona główna'
              : locale === 'en'
              ? 'Home'
              : 'Головна',
        },
      },
    ],
  };

  return [organizationSchema, websiteSchema, breadcrumbSchema];
};
