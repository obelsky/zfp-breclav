import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://zfp-breclav.cz'),
  title: {
    default: 'Hypotéky, investice a pojištění Břeclav | ZFP GROUP',
    template: '%s | ZFP Břeclav',
  },
  description: 'Finanční poradenství v Břeclavi. 10 let praxe, zázemí ZFP GROUP s 30letou tradicí. Hypotéky vyřídíme za vás, investice nastavíme podle vašeho života. Osobně, v Břeclavi.',
  keywords: [
    'finanční poradenství Břeclav',
    'hypotéky Břeclav',
    'hypoteční poradce Břeclav',
    'ZFP Břeclav',
    'finanční poradce jižní Morava',
    'investice Břeclav',
    'pojištění Břeclav',
    'finanční vzdělávání',
    'hypoteční kalkulačka',
    'refinancování hypotéky Břeclav',
    'finanční gramotnost',
  ],
  authors: [{ name: 'ZFP GROUP' }],
  creator: 'ZFP GROUP',
  publisher: 'ZFP GROUP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://zfp-breclav.cz',
    siteName: 'ZFP GROUP Břeclav',
    title: 'Hypotéky, investice a pojištění Břeclav | ZFP GROUP',
    description: '10 let pomáháme s financemi v Břeclavi. Hypotéky, investice, pojištění. Součást ZFP GROUP s 30letou tradicí.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZFP GROUP Břeclav - Finanční poradenství',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypotéky, investice a pojištění Břeclav | ZFP GROUP',
    description: '10 let pomáháme s financemi v Břeclavi. Hypotéky vyřídíme za vás, investice nastavíme podle vašeho života.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Navigation />
        <main className="lg:ml-64 min-h-screen">
          {children}
        </main>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'ZFP GROUP Břeclav',
              description: 'Regionální kancelář finančního poradenství a vzdělávání',
              url: 'https://zfp-breclav.cz',
              telephone: '+420123456789',
              email: 'breclav@zfp.cz',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Břeclav',
                addressRegion: 'Jihomoravský kraj',
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
              sameAs: [
                'https://www.facebook.com/zfpgroup',
                'https://www.linkedin.com/company/zfp-group',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
