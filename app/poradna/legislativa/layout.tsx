import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legislativa | Zákony a daně Břeclav | Finanční změny | ZFP GROUP',
  description: 'Finanční legislativa v Břeclavi - zákony, daně, změny a novinky. Jak vás ovlivňují nové předpisy, daňové úlevy, legislativní změny. Aktuální informace.',
  keywords: ['legislativa', 'zákony', 'daně', 'daňové změny', 'finanční předpisy', 'Břeclav'],
  openGraph: {
    title: 'Legislativa | Zákony a daně Břeclav',
    description: 'Zákony, daně a změny, které vás ovlivňují. Aktuální informace o finanční legislativě.',
    url: 'https://www.zfpbreclav.cz/poradna/legislativa',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
