import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční vzdělávání Břeclav | Kurzy finanční gramotnosti',
  description: 'Kurzy a semináře finanční gramotnosti v Břeclavi. Naučte se rozumět penězům, investovat a dělat informovaná rozhodnutí. ZFP má 30 let zkušeností ve vzdělávání.',
  keywords: 'finanční vzdělávání, finanční gramotnost, kurzy, semináře, Břeclav, finanční minimum',
  openGraph: {
    title: 'Finanční vzdělávání Břeclav | ZFP GROUP',
    description: 'Kurzy finanční gramotnosti - naučte se rozumět penězům a investovat.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
