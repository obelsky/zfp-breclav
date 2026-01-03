import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navazující finanční vzdělávání | Pokročilé kurzy Břeclav | Investice a daně | ZFP GROUP',
  description: 'Pokročilé finanční vzdělávání v Břeclavi. Kurzy investování, daňové optimalizace, nemovitosti, kryptoměny. Pro absolventy základního kurzu. Praktické workshopy s experty. Certifikát.',
  keywords: ['pokročilé finance', 'kurzy investování', 'daňová optimalizace', 'finanční vzdělávání', 'Břeclav'],
  openGraph: {
    title: 'Navazující finanční vzdělávání | Pokročilé kurzy Břeclav',
    description: 'Pokročilé kurzy investování, daní a finančního plánování. Pro absolventy základního kurzu.',
    url: 'https://www.zfpbreclav.cz/financni-vzdelavani/navazujici-vzdelavani',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
