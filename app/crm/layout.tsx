'use client';

import { CRMAuthProvider } from '@/contexts/CRMAuthContext';
import PushNotificationProvider from '@/components/crm/PushNotificationProvider';

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
