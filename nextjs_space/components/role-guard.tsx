'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackUrl?: string;
}

export function RoleGuard({ children, allowedRoles, fallbackUrl = '/dashboard' }: RoleGuardProps) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userRole = (session.user as any)?.role;
      if (!allowedRoles?.includes?.(userRole)) {
        router.replace(fallbackUrl);
      }
    }
  }, [status, session, allowedRoles, fallbackUrl, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
      </div>
    );
  }

  if (status === 'authenticated') {
    const userRole = (session?.user as any)?.role;
    if (allowedRoles?.includes?.(userRole)) {
      return <>{children}</>;
    }
  }

  return null;
}
