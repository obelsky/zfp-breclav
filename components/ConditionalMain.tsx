'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // CRM routes don't need lg:ml-64 because they have their own layout
  const isCRM = pathname?.startsWith('/crm');
  
  return (
    <main className={isCRM ? 'min-h-screen' : 'lg:ml-64 min-h-screen'}>
      {children}
    </main>
  );
}
