import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak funguje systém ZFP | Metodika finančního poradenství Břeclav | Transparentní proces | ZFP GROUP',
  description: 'Jak pracujeme s klienty v Břeclavi. Náš unikátní systém finančního poradenství - od analýzy po implementaci. Transparentní proces, nezávislý přístup, měřitelné výsledky. Bez skrytých poplatků.',
  keywords: ['finanční poradenství', 'metodika', 'transparentnost', 'proces poradenství', 'ZFP systém', 'Břeclav'],
  openGraph: {
    title: 'Jak funguje systém ZFP | Metodika poradenství Břeclav',
    description: 'Transparentní systém finančního poradenství od analýzy po implementaci. Nezávislý přístup a měřitelné výsledky.',
    url: 'https://www.zfpbreclav.cz/financni-vzdelavani/jak-funguje-system',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
