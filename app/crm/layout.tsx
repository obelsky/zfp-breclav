'use client';

import { usePathname } from 'next/navigation';
import { CRMAuthProvider, useCRMAuth } from '@/contexts/CRMAuthContext';
import PushNotificationProvider from '@/components/crm/PushNotificationProvider';
import CRMNavigation from '@/components/crm/CRMNavigation';
import Link from 'next/link';

// Note: Metadata for CRM is set in parent route
// robots: noindex, nofollow - CRM should not be indexed

function CRMLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useCRMAuth();
  
  // On login page (/crm), don't show navigation
  const isLoginPage = pathname === '/crm';
  
  if (isLoginPage) {
    return (
      <>
        {/* Simple header for login page */}
        <div className="fixed top-0 left-0 right-0 bg-zfp-darker border-b border-white/10 z-50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-white">CRM Systém</div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-zfp-gold hover:text-zfp-orange transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zpět na web
            </Link>
          </div>
        </div>
        {children}
      </>
    );
  }
  
  // After login, show full navigation
  return (
    <>
      <CRMNavigation />
      {children}
    </>
  );
}

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CRMAuthProvider>
      <PushNotificationProvider>
        <div className="flex min-h-screen bg-zfp-dark">
          <CRMLayoutContent>{children}</CRMLayoutContent>
        </div>
      </PushNotificationProvider>
    </CRMAuthProvider>
  );
}
