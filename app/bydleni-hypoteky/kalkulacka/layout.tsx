import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypoteční kalkulačka online zdarma | Výpočet splátky a úroku | Břeclav | ZFP GROUP',
  description: 'Hypoteční kalkulačka zdarma - spočítejte si měsíční splátku, celkové náklady, výši úroku i RPSN. Porovnání variant, výpočet akontace. Profesionální nástroj pro Břeclav a okolí.',
  keywords: ['hypoteční kalkulačka', 'výpočet hypotéky', 'kalkulačka splátky', 'úroková sazba', 'RPSN', 'akontace', 'Břeclav'],
  openGraph: {
    title: 'Hypoteční kalkulačka zdarma | Výpočet splátky online | ZFP GROUP Břeclav',
    description: 'Spočítejte si výši měsíční splátky, celkové náklady a RPSN hypotéky. Profesionální kalkulačka s okamžitými výsledky.',
    url: 'https://www.zfpbreclav.cz/bydleni-hypoteky/kalkulacka',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
