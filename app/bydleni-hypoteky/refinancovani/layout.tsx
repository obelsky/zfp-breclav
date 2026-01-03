import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refinancování hypotéky Břeclav | Nižší úrok a měsíční splátka | Úspora až 100 000 Kč | ZFP GROUP',
  description: 'Refinancování hypotéky v Břeclavi. Snížte úrok až o 2%, ušetřete tisíce měsíčně. Výpočet úspory zdarma, bez poplatků. Rychlé vyřízení, možnost navýšení úvěru. Bezplatná konzultace.',
  keywords: ['refinancování hypotéky', 'přefinancování úvěru', 'nižší úrok', 'změna banky', 'úspora na hypotéce', 'konsolidace', 'Břeclav'],
  openGraph: {
    title: 'Refinancování hypotéky - Ušetřete až 100 000 Kč | Finanční poradce Břeclav',
    description: 'Máte hypotéku s vysokým úrokem? Refinancování může ročně ušetřit desítky tisíc. Výpočet úspory zdarma, vyřízení bez poplatků.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/refinancovani',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
