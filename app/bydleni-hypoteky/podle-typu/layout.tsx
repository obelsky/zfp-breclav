import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Druhy hypotéky | Typy hypotečních úvěrů | Americká vs anuitní | Břeclav | ZFP GROUP',
  description: 'Všechny druhy a typy hypotéky - americká, anuitní, hypotéka bez doložení příjmu, fixní úrok, variabilní sazba. Porovnání výhod a nevýhod každého typu pro klienty z Břeclavi.',
  keywords: ['druhy hypotéky', 'typy hypotéky', 'americká hypotéka', 'anuitní', 'fixní úrok', 'variabilní sazba', 'Břeclav'],
  openGraph: {
    title: 'Druhy a typy hypotéky | Kompletní přehled | ZFP GROUP Břeclav',
    description: 'Porovnání všech typů hypotéky - americká, anuitní, s fixním úrokem. Najdeme nejlepší variantu pro vaši situaci.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/podle-typu',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
