import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chci se stát finančním profesionálem | Kariéra ve financích Břeclav | ZFP Akademie | ZFP GROUP',
  description: 'Kariéra ve finančním poradenství v Břeclavi. Komplexní školení, certifikace, mentoring, vlastní klientela. Staňte se finančním poradcem s podporou zkušeného týmu. Možnost růstu.',
  keywords: ['kariéra ve financích', 'finanční poradce', 'školení poradců', 'certifikace', 'mentoring', 'Břeclav'],
  openGraph: {
    title: 'Chci se stát finančním profesionálem | Kariéra ve financích Břeclav',
    description: 'Komplexní školení a podpora pro budoucí finanční poradce. Od základů po certifikaci a vlastní klientelu.',
    url: 'https://www.zfpbreclav.cz/jak-vam-muzeme-pomoci/rozvoj',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
