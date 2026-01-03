import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční plánování | Osobní finanční plán Břeclav | Rozpočet a cíle | ZFP GROUP',
  description: 'Finanční plánování v Břeclavi. Osobní finanční plán, analýza rozpočtu, stanovení cílů, optimalizace výdajů. Dosáhněte finančních cílů bez starostí. Konzultace zdarma.',
  keywords: ['finanční plánování', 'osobní finanční plán', 'rozpočet', 'finanční cíle', 'Břeclav'],
  openGraph: {
    title: 'Finanční plánování | Osobní finanční plán Břeclav',
    description: 'Osobní finanční plán - analýza rozpočtu, stanovení cílů, optimalizace výdajů. Dosáhněte finančních cílů.',
    url: 'https://www.zfpbreclav.cz/financni-poradenstvi/financni-planovani',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
