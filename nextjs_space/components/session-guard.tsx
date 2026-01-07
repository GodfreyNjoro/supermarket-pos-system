'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const hasValidated = useRef(false);

  const validateSession = useCallback(async () => {
    if (!session?.user || hasValidated.current) return;
    
    const user = session.user as any;
    if (!user.id || !user.sessionToken) return;

    try {
      const res = await fetch('/api/auth/validate-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          sessionToken: user.sessionToken 
        }),
      });
      
      const data = await res.json();
      
      if (!data.valid) {
        toast({
          title: 'Session Expired',
          description: 'You have been logged out because another session was started.',
          variant: 'destructive',
        });
        await signOut({ callbackUrl: '/' });
      }
      hasValidated.current = true;
    } catch (error) {
      console.error('Session validation error:', error);
    }
  }, [session]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      validateSession();
      
      // Validate session periodically (every 30 seconds)
      const interval = setInterval(() => {
        hasValidated.current = false;
        validateSession();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [status, session, validateSession]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
}
