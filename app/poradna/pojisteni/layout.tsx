import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pojištění | Jak se správně pojistit Břeclav | Rady o pojistkách | ZFP GROUP',
  description: 'Rady o pojištění v Břeclavi - životní, úrazové, majetkové pojištění. Jak se správně pojistit, neplatit zbytečně a vybrat správné pojistky. Nezávislé porovnání.',
  keywords: ['pojištění', 'pojistky', 'životní pojištění', 'úrazové pojištění', 'majetkové pojištění', 'Břeclav'],
  openGraph: {
    title: 'Pojištění | Jak se správně pojistit Břeclav',
    description: 'Jak se správně pojistit a neplatit zbytečně. Rady o životním, úrazovém a majetkovém pojištění.',
    url: 'https://www.zfpbreclav.cz/poradna/pojisteni',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
