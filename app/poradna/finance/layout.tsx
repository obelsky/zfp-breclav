import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finance | Rady o rozpočtu a spoření Břeclav | Finanční plánování | ZFP GROUP',
  description: 'Praktické rady o financích v Břeclavi - rozpočet, spoření, finanční plánování, hospodaření. Tipy jak ušetřit a lépe spravovat peníze. Odborné články zdarma.',
  keywords: ['finance', 'rozpočet', 'spoření', 'finanční plánování', 'hospodaření', 'Břeclav'],
  openGraph: {
    title: 'Finance | Rady o rozpočtu a spoření Břeclav',
    description: 'Praktické rady o financích - rozpočet, spoření a finanční plánování pro každého.',
    url: 'https://www.zfpbreclav.cz/poradna/finance',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
