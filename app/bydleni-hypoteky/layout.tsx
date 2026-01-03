import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéky a financování bydlení Břeclav | Hypoteční poradce | Kalkulačka zdarma | ZFP GROUP',
  description: 'Hypoteční poradenství v Břeclavi a okolí. Srovnáme všechny banky, najdeme nejvýhodnější úrok. První bydlení, refinancování, OSVČ. Hypoteční kalkulačka zdarma. 10 let zkušeností.',
  keywords: ['hypotéky Břeclav', 'hypoteční poradce', 'financování bydlení', 'hypoteční kalkulačka', 'refinancování', 'první bydlení', 'OSVČ hypotéka'],
  openGraph: {
    title: 'Hypotéky a financování bydlení | Hypoteční poradce Břeclav | ZFP GROUP',
    description: 'Kompletní hypoteční poradenství v Břeclavi. Srovnáme všechny banky, pomůžeme s výběrem nejvýhodnějšího úvěru. Kalkulačka a konzultace zdarma.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
