import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéka pro rodinu s dětmi Břeclav | Větší bydlení se státní podporou | ZFP GROUP',
  description: 'Hypotéka pro rodiny s dětmi v Břeclavi. Financování většího bytu nebo domu, přístavba, využití státní podpory a odpuštění části úvěru. Rodinné výhody a zvýhodnění.',
  keywords: ['hypotéka rodina s dětmi', 'větší bydlení', 'státní podpora rodiny', 'přístavba', 'rodinný dům', 'Břeclav'],
  openGraph: {
    title: 'Hypotéka pro rodinu s dětmi | Finanční poradce Břeclav',
    description: 'Rostoucí rodina potřebuje větší prostor. Pomůžeme s financováním většího bydlení včetně využití státní podpory a výhod pro rodiny s dětmi.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/rodina-s-detmi',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
