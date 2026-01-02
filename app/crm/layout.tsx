'use client';

import { CRMAuthProvider } from '@/contexts/CRMAuthContext';
import PushNotificationProvider from '@/components/crm/PushNotificationProvider';
import CRMNavigation from '@/components/crm/CRMNavigation';

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
        <div className="flex min-h-screen bg-zfp-dark">
          <CRMNavigation />
          {children}
        </div>
      </PushNotificationProvider>
    </CRMAuthProvider>
  );
}
