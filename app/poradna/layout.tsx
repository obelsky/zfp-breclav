import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanční poradna | Rady a články o financích Břeclav | Blog ZFP GROUP',
  description: 'Finanční poradna v Břeclavi - praktické rady o financích, investování, pojištění, nemovitostech a daních. Odborné články, návody a tipy pro každého. Nezávislé informace.',
  keywords: ['finanční poradna', 'finanční blog', 'rady o financích', 'investování', 'pojištění', 'Břeclav'],
  openGraph: {
    title: 'Finanční poradna | Rady a články o financích Břeclav',
    description: 'Praktické rady o financích, investování, pojištění a nemovitostech. Odborné články pro každého.',
    url: 'https://www.zfpbreclav.cz/poradna',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
