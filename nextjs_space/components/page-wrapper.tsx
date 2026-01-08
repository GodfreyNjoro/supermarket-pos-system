'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession() || {};
  const userRole = (session?.user as any)?.role;
  const isCashier = userRole === 'CASHIER';

  if (isCashier) {
    return <main>{children}</main>;
  }

  return <main className="lg:ml-64 pt-16">{children}</main>;
}
