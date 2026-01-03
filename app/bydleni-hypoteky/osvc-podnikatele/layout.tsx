import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéka pro OSVČ a podnikatele Břeclav | Úvěr bez dokladování příjmů | ZFP GROUP',
  description: 'Hypotéka pro OSVČ, živnostníky a podnikatele v Břeclavi. Známe banky vstřícné k podnikatelům. Možnost bez dokladování příjmů, i s kratší historií podnikání. Individuální přístup.',
  keywords: ['hypotéka OSVČ', 'úvěr podnikatelé', 'živnostník hypotéka', 'bez dokladování příjmů', 'úvěr bez ručitele', 'Břeclav'],
  openGraph: {
    title: 'Hypotéka pro OSVČ a podnikatele | Finanční poradce Břeclav',
    description: 'Specializujeme se na hypotéky pro podnikatele a živnostníky. Známe banky s vstřícným přístupem k OSVČ a nabízíme řešení i bez dokladování příjmů.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/osvc-podnikatele',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
