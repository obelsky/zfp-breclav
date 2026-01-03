import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéka na rekonstrukci domu Břeclav | Úvěr na stavební úpravy a modernizaci | ZFP GROUP',
  description: 'Hypotéka na rekonstrukci, přístavbu či modernizaci domu v Břeclavi. Výhodné financování stavebních úprav, zateplení, nové střechy nebo kompletní rekonstrukce. Úvěr až 100% nákladů.',
  keywords: ['hypotéka na rekonstrukci', 'úvěr stavební úpravy', 'přístavba financování', 'modernizace domu', 'zateplení', 'Břeclav'],
  openGraph: {
    title: 'Hypotéka na rekonstrukci a stavební úpravy | Finanční poradce Břeclav',
    description: 'Rekonstrukce, přístavba nebo modernizace. Pomůžeme financovat proměnu vašeho domu či bytu výhodným hypotečním úvěrem až na 100% nákladů.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/stavebni-upravy',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
