'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { PWARegistration } from '@/components/pwa-registration';
import { InstallPrompt } from '@/components/install-prompt';
import { Toaster } from '@/components/ui/toaster';
import { StoreProvider } from '@/lib/contexts/store-context';
import { CurrencyProvider } from '@/lib/contexts/currency-context';
import { SidebarProvider } from '@/components/page-wrapper';
import { AppWalkthrough, useAppWalkthrough } from '@/components/app-walkthrough';
import { ReactNode, useEffect, useState } from 'react';

function WalkthroughWrapper() {
  const { runTour, completeTour } = useAppWalkthrough();
  
  return (
    <AppWalkthrough
      runTour={runTour}
      onComplete={completeTour}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider>
      <StoreProvider>
        <CurrencyProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <PWARegistration />
              <InstallPrompt />
              <WalkthroughWrapper />
              <Toaster />
              {children}
            </ThemeProvider>
          </SidebarProvider>
        </CurrencyProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
