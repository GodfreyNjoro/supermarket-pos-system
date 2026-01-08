'use client';

import { useSession } from 'next-auth/react';
import { ReactNode, useState, useEffect } from 'react';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession() || {};
  const userRole = (session?.user as any)?.role;
  const isCashier = userRole === 'CASHIER';
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const checkPinned = () => {
      const saved = localStorage.getItem('sidebar-pinned');
      setIsPinned(saved === null || saved === 'true');
    };
    checkPinned();
    window.addEventListener('storage', checkPinned);
    // Listen for custom event from navigation
    const interval = setInterval(checkPinned, 100);
    return () => {
      window.removeEventListener('storage', checkPinned);
      clearInterval(interval);
    };
  }, []);

  if (isCashier) {
    return <main>{children}</main>;
  }

  return (
    <main className={`pt-16 transition-all duration-300 ${isPinned ? 'lg:ml-64' : 'lg:ml-16'}`}>
      {children}
    </main>
  );
}
