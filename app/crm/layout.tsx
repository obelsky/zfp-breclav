'use client';

import { CRMAuthProvider } from '@/contexts/CRMAuthContext';
import PushNotificationProvider from '@/components/crm/PushNotificationProvider';

// Note: Metadata for CRM is set in parent route
// robots: noindex, nofollow - CRM should not be indexed

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CRMAuthProvider>
      <PushNotificationProvider>
        {children}
      </PushNotificationProvider>
    </CRMAuthProvider>
  );
}
