import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční poradenství Břeclav | Nezávislý finanční poradce',
  description: 'Profesionální finanční poradenství v Břeclavi. Hypotéky, investice, pojištění, reality. Osobní přístup, důraz na vzdělávání. Součást ZFP GROUP s 30letou tradicí.',
  keywords: 'finanční poradenství, finanční poradce, Břeclav, hypotéky, investice, pojištění, reality',
  openGraph: {
    title: 'Finanční poradenství Břeclav | ZFP GROUP',
    description: 'Profesionální finanční poradenství - hypotéky, investice, pojištění.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
