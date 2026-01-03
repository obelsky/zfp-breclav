import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reality | Realitní poradenství Břeclav | Koupě, prodej, investice | ZFP GROUP',
  description: 'Realitní poradenství v Břeclavi. Koupě nemovitosti, prodej, investice do reality, hypoteční financování. Pomoc při výběru, oceňování, sjednání hypotéky. Konzultace zdarma.',
  keywords: ['reality', 'nemovitosti', 'koupě bytu', 'prodej domu', 'investice reality', 'Břeclav'],
  openGraph: {
    title: 'Reality | Realitní poradenství Břeclav',
    description: 'Koupě, prodej a investice do nemovitostí. Hypoteční financování a realitní poradenství.',
    url: 'https://www.zfpbreclav.cz/financni-poradenstvi/reality',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
