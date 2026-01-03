import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licence & odpovědnost | ZFP Břeclav - Pojištění odpovědnosti 50 mil. Kč',
  description: 'Oprávnění a licence ČNB, pojištění profesní odpovědnosti 50 mil. Kč. Registrace ČNB, certifikace IFP/PFP. Bezpečnost a ochrana klientů. ZFP Břeclav.',
  keywords: ['licence ČNB', 'pojištění odpovědnosti', 'certifikace', 'IFP', 'PFP', 'regulace'],
  openGraph: {
    title: 'Licence & odpovědnost | ZFP Břeclav',
    description: 'Oprávnění ČNB, pojištění odpovědnosti 50 mil. Kč. Vaše bezpečnost je priorita.',
    url: 'https://www.zfpbreclav.cz/o-kancelari/licence-odpovednost',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
