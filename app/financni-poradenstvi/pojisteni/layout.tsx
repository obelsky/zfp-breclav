import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pojištění | Pojišťovací poradenství Břeclav | Životní, úrazové, majetkové | ZFP GROUP',
  description: 'Pojišťovací poradenství v Břeclavi. Životní pojištění, úrazové, majetkové, investiční životko. Nezávislé porovnání pojišťoven. Ochrana rodiny a majetku. Analýza zdarma.',
  keywords: ['pojištění', 'životní pojištění', 'úrazové pojištění', 'majetkové pojištění', 'Břeclav'],
  openGraph: {
    title: 'Pojištění | Pojišťovací poradenství Břeclav',
    description: 'Životní, úrazové a majetkové pojištění. Nezávislé porovnání a ochrana rodiny.',
    url: 'https://www.zfpbreclav.cz/financni-poradenstvi/pojisteni',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
