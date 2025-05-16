type SchemaOrgProps = {
  url: string;
};

export const generateSchemaOrgMarkup = ({ url }: SchemaOrgProps) => {
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.1235,
      longitude: 18.0084,
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
    inLanguage: 'pl',
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
          name: 'Strona główna',
        },
      },
    ],
  };

  return [organizationSchema, websiteSchema, breadcrumbSchema];
};
