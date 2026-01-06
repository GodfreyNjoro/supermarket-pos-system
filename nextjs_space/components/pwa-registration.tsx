'use client';

import { useEffect } from 'react';
import { syncManager } from '@/lib/sync-manager';
import { offlineDB } from '@/lib/indexeddb';

export function PWARegistration() {
  useEffect(() => {
    // Initialize IndexedDB
    offlineDB.init().then(() => {
      console.log('[PWA] IndexedDB initialized');
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration);
          
          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SYNC_TRANSACTIONS') {
              window.dispatchEvent(new Event('sync-transactions'));
            }
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }

    // Listen for sync-transactions event
    const handleSync = () => {
      console.log('[PWA] Sync event triggered');
      syncManager.syncAllTransactions();
    };

    window.addEventListener('sync-transactions', handleSync);

    // Cache data for offline use when online
    if (navigator.onLine) {
      syncManager.cacheDataForOffline();
    }

    // Recache data periodically (every 5 minutes)
    const cacheInterval = setInterval(() => {
      if (navigator.onLine) {
        syncManager.cacheDataForOffline();
      }
    }, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('sync-transactions', handleSync);
      clearInterval(cacheInterval);
    };
  }, []);

  return null;
}
