import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vzdělávání jako základ | ZFP Břeclav - Finanční gramotnost a kurzy',
  description: 'Vzdělávání je základ našeho přístupu. Kurzy finanční gramotnosti, semináře, workshopy pro klienty. Rozumět financím znamená lépe rozhodovat. ZFP Břeclav.',
  keywords: ['finanční vzdělávání', 'kurzy', 'semináře', 'finanční gramotnost', 'workshopy'],
  openGraph: {
    title: 'Vzdělávání jako základ | ZFP Břeclav',
    description: 'Kurzy finanční gramotnosti a semináře. Vzdělaný klient je spokojený klient.',
    url: 'https://www.zfpbreclav.cz/o-kancelari/vzdelavani',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
