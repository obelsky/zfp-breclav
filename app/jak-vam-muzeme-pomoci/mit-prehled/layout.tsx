import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chci mít přehled, ale neřešit detaily | Finanční správa Břeclav | Osobní finančník | ZFP GROUP',
  description: 'Osobní finanční manažer v Břeclavi. Komplexní správa vašich financí, strategické plánování, investice. Nezávislý přístup, výsledky vidíte vy. Profesionální správa bez starostí.',
  keywords: ['finanční správa', 'osobní finančník', 'správa investic', 'finanční manažer', 'Břeclav'],
  openGraph: {
    title: 'Chci mít přehled, ale neřešit detaily | Finanční správa Břeclav',
    description: 'Komplexní správa vašich financí od osobního finančního manažera. Strategické plánování a nezávislý přístup.',
    url: 'https://www.zfpbreclav.cz/jak-vam-muzeme-pomoci/mit-prehled',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
