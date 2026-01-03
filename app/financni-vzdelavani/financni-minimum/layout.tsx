import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční minimum | Základy finanční gramotnosti Břeclav | Kurz pro začátečníky | ZFP GROUP',
  description: 'Kurz finanční gramotnosti pro začátečníky v Břeclavi. Naučte se základy rozpočtu, spoření, úvěrů a pojištění. Praktické workshopy, certifikát, bez předchozích znalostí. Zdarma.',
  keywords: ['finanční gramotnost', 'kurz financí', 'rozpočet', 'spoření', 'základy financí', 'Břeclav'],
  openGraph: {
    title: 'Finanční minimum | Základy finanční gramotnosti Břeclav',
    description: 'Bezplatný kurz základů financí - rozpočet, spoření, úvěry, pojištění. Pro začátečníky bez předchozích znalostí.',
    url: 'https://www.zfpbreclav.cz/financni-vzdelavani/financni-minimum',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
