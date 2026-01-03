import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chci rozumět svým financím | Finanční vzdělávání Břeclav | Kurzy finanční gramotnosti | ZFP GROUP',
  description: 'Naučte se rozumět svým financím v Břeclavi. Vzdělávací programy, konzultace, finanční gramotnost bez tlaku na sjednání produktů. Nezávislé informace a praktické rady.',
  keywords: ['finanční gramotnost', 'finanční vzdělávání', 'kurzy financí', 'konzultace Břeclav', 'nezávislé poradenství'],
  openGraph: {
    title: 'Chci rozumět svým financím | Finanční vzdělávání Břeclav',
    description: 'Vzdělávací programy a konzultace pro lepší orientaci ve financích. Bez tlaku, s důrazem na pochopení.',
    url: 'https://www.zfpbreclav.cz/jak-vam-muzeme-pomoci/rozumet-financim',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
