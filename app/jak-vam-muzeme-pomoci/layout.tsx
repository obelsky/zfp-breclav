import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak vám můžeme pomoci | Finanční poradenství Břeclav | 3 cesty spolupráce | ZFP GROUP',
  description: 'Tři cesty finanční spolupráce v Břeclavi - vzdělávání, nezávislé poradenství nebo komplexní správa financí. Vyberte si cestu podle svých potřeb. Osobní přístup bez tlaku.',
  keywords: ['finanční poradenství', 'finanční vzdělávání', 'správa financí', 'finanční svoboda', 'Břeclav'],
  openGraph: {
    title: 'Jak vám můžeme pomoci | Finanční poradenství Břeclav',
    description: 'Tři legitimní cesty spolupráce - od vzdělávání po komplexní správu financí. Vyberte si podle svých potřeb.',
    url: 'https://www.zfpbreclav.cz/jak-vam-muzeme-pomoci',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
