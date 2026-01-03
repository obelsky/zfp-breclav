import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'eŠanon | Digitální přehled financí Břeclav | Mobilní aplikace | ZFP GROUP',
  description: 'eŠanon - digitální přehled všech vašich financí v Břeclavi. Sledujte investice, pojištění, úvěry a spoření v jedné mobilní aplikaci. Přístup 24/7, bezpečné úložiště dokumentů.',
  keywords: ['eŠanon', 'digitální finance', 'mobilní aplikace', 'přehled financí', 'správa investic', 'Břeclav'],
  openGraph: {
    title: 'eŠanon | Digitální přehled financí Břeclav',
    description: 'Všechny finanční produkty na jednom místě. Mobilní aplikace pro sledování investic, pojištění a úspor.',
    url: 'https://www.zfpbreclav.cz/esanon',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
