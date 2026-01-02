'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show main Navigation on CRM routes
  // CRM has its own CRMNavigation in app/crm/layout.tsx
  if (pathname?.startsWith('/crm')) {
    return null;
  }
  
  return <Navigation />;
}
