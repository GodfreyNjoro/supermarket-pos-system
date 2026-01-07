'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { PWARegistration } from '@/components/pwa-registration';
import { InstallPrompt } from '@/components/install-prompt';
import { Toaster } from '@/components/ui/toaster';
import { StoreProvider } from '@/lib/contexts/store-context';
import { CurrencyProvider } from '@/lib/contexts/currency-context';
import { ReactNode, useEffect, useState } from 'react';

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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <PWARegistration />
            <InstallPrompt />
            <Toaster />
            {children}
          </ThemeProvider>
        </CurrencyProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
