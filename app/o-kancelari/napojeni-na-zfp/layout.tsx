import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Napojení na ZFP GROUP | Regionální kancelář Břeclav - 30 let tradice',
  description: 'Jsme součástí ZFP GROUP s 30letou tradicí. Síla celostátní sítě, osobní přístup regionální kanceláře. 50 000+ spokojených klientů, největší nezávislý poradce v ČR.',
  keywords: ['ZFP GROUP', 'regionální kancelář', 'tradice', 'nezávislost', 'celostátní síť'],
  openGraph: {
    title: 'Napojení na ZFP GROUP | Regionální kancelář Břeclav',
    description: 'Součást ZFP GROUP s 30letou tradicí. Síla celostátní sítě, osobní přístup.',
    url: 'https://www.zfpbreclav.cz/o-kancelari/napojeni-na-zfp',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'ZFP GROUP Břeclav',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
