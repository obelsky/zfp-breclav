import { Metadata } from 'next';

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  canonical,
}: PageMetadataProps): Metadata {
  const baseUrl = 'https://zfp-breclav.cz';
  const fullTitle = `${title} | ZFP Břeclav`;

  return {
    title,
    description,
    keywords: [
      'ZFP Břeclav',
      'finanční poradenství Břeclav',
      'hypotéky Břeclav',
      ...keywords,
    ],
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'cs_CZ',
      url: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: canonical
      ? {
          canonical: `${baseUrl}${canonical}`,
        }
      : undefined,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'ZFP GROUP Břeclav',
    description: 'Regionální kancelář finančního poradenství a vzdělávání v Břeclavi',
    url: 'https://zfp-breclav.cz',
    telephone: '+420123456789',
    email: 'breclav@zfp.cz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Břeclav',
      addressRegion: 'Jihomoravský kraj',
      postalCode: '691 41',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '48.7591',
      longitude: '16.8821',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '48.7591',
        longitude: '16.8821',
      },
      geoRadius: '50000',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://zfp-breclav.cz${item.url}`,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'FinancialService',
      name: service.provider,
    },
    areaServed: {
      '@type': 'City',
      name: service.areaServed,
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// GEO optimization keywords for Břeclav region
export const geoKeywords = [
  'Břeclav',
  'finanční poradenství Břeclav',
  'hypotéky Břeclav',
  'investice Břeclav',
  'pojištění Břeclav',
  'Jihomoravský kraj',
  'jižní Morava',
  'Hodonín',
  'Mikulov',
  'Hustopeče',
];

// AIO (AI Overviews) optimization - structured content
export function generateAIOContent(topic: string, points: string[]) {
  return {
    topic,
    keyPoints: points,
    expertise: 'ZFP GROUP Břeclav - Licencovaní finanční poradci',
    location: 'Břeclav, Jihomoravský kraj',
  };
}
