import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční přehled | Komplexní analýza financí Břeclav | Osobní finanční audit | ZFP GROUP',
  description: 'Komplexní přehled vašich financí v Břeclavi. Analýza příjmů, výdajů, investic, pojištění, daní. Identifikace úspor a rizik. Osobní konzultace s finančním expertem. Nezávislé hodnocení.',
  keywords: ['finanční přehled', 'finanční analýza', 'osobní finance', 'finanční audit', 'konzultace', 'Břeclav'],
  openGraph: {
    title: 'Finanční přehled | Komplexní analýza financí Břeclav',
    description: 'Získejte kompletní přehled o svých financích. Analýza, identifikace úspor a rizik, nezávislé hodnocení.',
    url: 'https://www.zfpbreclav.cz/financni-vzdelavani/financni-prehled',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
