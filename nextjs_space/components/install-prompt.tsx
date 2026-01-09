'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('[InstallPrompt] User accepted the install prompt');
    } else {
      console.log('[InstallPrompt] User dismissed the install prompt');
    }

    // Clear the deferredPrompt for next time
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom">
      <div className="rounded-lg bg-white p-4 shadow-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Download className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Install POS System
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Install this app on your desktop for quick access and offline support!
            </p>
            <div className="mt-3 flex space-x-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Install
              </Button>
              <Button
                onClick={handleDismiss}
                size="sm"
                variant="outline"
              >
                Not now
              </Button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
