import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Náš tým | Finanční poradci Břeclav | ZFP GROUP - Osobní přístup k financím',
  description: 'Náš tým finančních poradců v Břeclavi. Ing. Marek Franc a specialisté na hypotéky, investice, pojištění. Osobní přístup, 10 let zkušeností. Poznejte náš tým.',
  keywords: ['finanční poradci', 'tým', 'Marek Franc', 'Břeclav', 'osobní přístup'],
  openGraph: {
    title: 'Náš tým | Finanční poradci Břeclav',
    description: 'Poznejte náš tým finančních poradců. Osobní přístup k vašim financím.',
    url: 'https://www.zfpbreclav.cz/o-kancelari/kdo-jsme',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
