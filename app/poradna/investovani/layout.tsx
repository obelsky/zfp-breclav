import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investování | Jak investovat peníze Břeclav | Investiční strategie | ZFP GROUP',
  description: 'Rady o investování v Břeclavi - jak začít investovat, kam dát peníze, rizika, diverzifikace. Investiční strategie pro začátečníky i pokročilé. Nezávislé informace.',
  keywords: ['investování', 'jak investovat', 'investiční strategie', 'akcie', 'fondy', 'Břeclav'],
  openGraph: {
    title: 'Investování | Jak investovat peníze Břeclav',
    description: 'Jak investovat, kam dát peníze a jak se vyhnout chybám. Praktické rady pro začátečníky i pokročilé.',
    url: 'https://www.zfpbreclav.cz/poradna/investovani',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
