import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naše hodnoty | ZFP Břeclav - Nezávislost, vzdělávání, transparentnost',
  description: 'Hodnoty ZFP Břeclav - nezávislost, vzdělávání klientů, transparentnost, dlouhodobý vztah. Finanční poradenství postavené na důvěře a etice.',
  keywords: ['hodnoty', 'nezávislost', 'transparentnost', 'etika', 'finanční vzdělávání'],
  openGraph: {
    title: 'Naše hodnoty | ZFP Břeclav',
    description: 'Nezávislost, vzdělávání, transparentnost. Hodnoty, na kterých stavíme finanční poradenství.',
    url: 'https://www.zfpbreclav.cz/o-kancelari/hodnoty',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
