import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O kanceláři | ZFP GROUP Břeclav - Náš tým a hodnoty',
  description: 'Regionální kancelář ZFP v Břeclavi. Poznejte náš tým, naše hodnoty a filozofii. 10 let zkušeností, součást ZFP GROUP s 30letou tradicí.',
  keywords: 'o nás, tým, ZFP Břeclav, hodnoty, finanční poradci, licence',
  openGraph: {
    title: 'O kanceláři | ZFP GROUP Břeclav',
    description: 'Poznejte náš tým a naše hodnoty - 10 let zkušeností v Břeclavi.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
