import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reality | Koupě a prodej nemovitostí Břeclav | Hypotéky | ZFP GROUP',
  description: 'Rady o nemovitostech v Břeclavi - koupě, prodej, financování, hypotéky. Jak nakoupit byt nebo dům, vyhnout se chybám. Tipy pro kupující i prodávající.',
  keywords: ['reality', 'nemovitosti', 'koupě bytu', 'prodej domu', 'hypotéka', 'Břeclav'],
  openGraph: {
    title: 'Reality | Koupě a prodej nemovitostí Břeclav',
    description: 'Koupě, prodej a financování nemovitostí. Praktické rady pro kupující i prodávající.',
    url: 'https://www.zfpbreclav.cz/poradna/reality',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
