'use client';

import { CRMAuthProvider } from '@/contexts/CRMAuthContext';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CRMAuthProvider>{children}</CRMAuthProvider>;
}
