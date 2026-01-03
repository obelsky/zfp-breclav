import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéka na investici do nemovitostí Břeclav | Investiční úvěr na pronájem | ZFP GROUP',
  description: 'Hypotéka na investiční nemovitosti v Břeclavi. Financování bytu nebo domu k pronájmu s výhodným úrokem. Pasivní příjem z nájemného, výpočet výnosnosti, daňové optimalizace.',
  keywords: ['hypotéka investice nemovitosti', 'investiční úvěr', 'byt k pronájmu', 'pasivní příjem', 'výnos z nemovitosti', 'Břeclav'],
  openGraph: {
    title: 'Hypotéka na investici do nemovitostí | Finanční poradce Břeclav',
    description: 'Nemovitost jako investice přináší stabilní pasivní příjem z pronájmu. Pomůžeme s financováním investičního bytu nebo domu včetně výpočtu výnosnosti.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/situace/investice',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
