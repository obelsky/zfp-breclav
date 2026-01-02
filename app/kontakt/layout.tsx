import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | ZFP GROUP Břeclav - Finanční poradenství',
  description: 'Kontaktujte nás pro nezávaznou konzultaci. ZFP GROUP Břeclav - Finanční poradenství, hypotéky, investice, pojištění. Jsme tu pro vás.',
  keywords: 'kontakt, Břeclav, finanční poradenství, konzultace, adresa, telefon, email',
  openGraph: {
    title: 'Kontakt | ZFP GROUP Břeclav',
    description: 'Kontaktujte nás pro nezávaznou konzultaci.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
