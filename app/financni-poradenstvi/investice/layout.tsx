import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investice | Investiční poradenství Břeclav | Fondy, ETF, dividendy | ZFP GROUP',
  description: 'Investiční poradenství v Břeclavi. Investiční fondy, ETF, dividendové akcie, dluhopisy. Diverzifikace portfolia, pasivní příjem. Konzultace a investiční plán zdarma.',
  keywords: ['investice', 'investiční poradenství', 'fondy', 'ETF', 'akcie', 'dividendy', 'Břeclav'],
  openGraph: {
    title: 'Investice | Investiční poradenství Břeclav',
    description: 'Investiční fondy, ETF, dividendové akcie. Diverzifikace portfolia a pasivní příjem.',
    url: 'https://www.zfpbreclav.cz/financni-poradenstvi/investice',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
