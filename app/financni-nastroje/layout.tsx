import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční kalkulačky | Hypoteční, důchodová, investiční kalkulačka',
  description: 'Bezplatné finanční kalkulačky - hypoteční, důchodová, spoření, finanční zdraví. Zjistěte si své možnosti okamžitě online.',
  keywords: 'kalkulačka, hypoteční kalkulačka, důchodová kalkulačka, spoření, investice, finanční zdraví',
  openGraph: {
    title: 'Finanční kalkulačky | ZFP GROUP Břeclav',
    description: 'Bezplatné finanční kalkulačky - spočítejte si hypotéku, důchod, investice.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
