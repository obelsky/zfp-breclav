import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak funguje hypotéka | Kompletní průvodce od A do Z | Proces schválení | ZFP GROUP Břeclav',
  description: 'Jak funguje hypotéka krok za krokem. Proces od žádosti po schválení, potřebné dokumenty, podmínky bank, fixace úroku, pojištění. Kompletní průvodce hypotékou pro Břeclav.',
  keywords: ['jak funguje hypotéka', 'proces schválení', 'hypoteční žádost', 'dokumenty', 'podmínky banky', 'fixace', 'Břeclav'],
  openGraph: {
    title: 'Jak funguje hypotéka | Kompletní průvodce | ZFP GROUP Břeclav',
    description: 'Celý proces hypotéky od žádosti po čerpání. Vysvětlíme podmínky, dokumenty i časový harmonogram.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/jak-to-funguje',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
