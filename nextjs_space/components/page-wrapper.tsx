'use client';

import { useSession } from 'next-auth/react';
import { ReactNode, useState, useEffect, createContext, useContext } from 'react';

// Context for sidebar state sharing
const SidebarContext = createContext({ isPinned: true, setIsPinned: (v: boolean) => {} });

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-pinned');
    if (saved !== null) {
      setIsPinned(saved === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-pinned', String(isPinned));
  }, [isPinned]);

  return (
    <SidebarContext.Provider value={{ isPinned, setIsPinned }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function PageWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession() || {};
  const userRole = (session?.user as any)?.role;
  const isCashier = userRole === 'CASHIER';
  const { isPinned } = useSidebar();

  if (isCashier) {
    return <main>{children}</main>;
  }

  return (
    <main className={`min-h-screen pt-16 transition-all duration-300 ${isPinned ? 'lg:ml-64' : 'lg:ml-16'}`}>
      {children}
    </main>
  );
}
