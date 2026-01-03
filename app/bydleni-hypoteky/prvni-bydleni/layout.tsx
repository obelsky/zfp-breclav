import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéka na první bydlení Břeclav | Úvěr pro začátečníky s nízkou akontací | ZFP GROUP',
  description: 'Hypotéka na první bydlení v Břeclavi a okolí. Pomůžeme získat výhodný úvěr i s 10% akontací a kratší pracovní historií. Státní podpora pro mladé. Bezplatná konzultace.',
  keywords: ['hypotéka první bydlení', 'úvěr nízká akontace', 'hypotéka začátečníci', 'první byt', 'mladá rodina', 'Břeclav'],
  openGraph: {
    title: 'Hypotéka na první bydlení | Finanční poradce Břeclav',
    description: 'První krok k vlastnímu bydlení. Pomůžeme vám získat hypotéku i s nízkou akontací, kratší pracovní historií a využít státní podporu.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/prvni-bydleni',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
