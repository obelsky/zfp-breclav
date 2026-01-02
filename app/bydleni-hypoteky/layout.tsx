import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hypotéky Břeclav | Hypoteční kalkulačka | ZFP GROUP',
  description: 'Hypoteční poradenství v Břeclavi. Srovnáme nabídky bank, pomůžeme s refinancováním. Hypoteční kalkulačka zdarma. 10 let zkušeností.',
  keywords: 'hypotéky Břeclav, hypoteční kalkulačka, refinancování, hypoteční poradce, první bydlení',
  openGraph: {
    title: 'Hypotéky Břeclav | ZFP GROUP',
    description: 'Hypoteční poradenství v Břeclavi - srovnáme banky, pomůžeme s refinancováním.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
