'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Store {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  isActive: boolean;
}

interface StoreContextType {
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  stores: Store[];
  loading: boolean;
  refreshStores: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const [selectedStore, setSelectedStoreState] = useState<Store | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stores');
      if (response.ok) {
        const data = await response.json();
        setStores(data);

        // Auto-select store based on user's assigned store or first active store
        if (session?.user) {
          const userStoreId = (session.user as any)?.storeId;
          if (userStoreId) {
            // User is assigned to a specific store
            const userStore = data.find((s: Store) => s.id === userStoreId);
            if (userStore) {
              setSelectedStoreState(userStore);
              localStorage.setItem('selectedStoreId', userStore.id);
            }
          } else {
            // Admin user - check localStorage or select first store
            const savedStoreId = localStorage.getItem('selectedStoreId');
            if (savedStoreId) {
              const savedStore = data.find((s: Store) => s.id === savedStoreId);
              if (savedStore) {
                setSelectedStoreState(savedStore);
              } else {
                // Saved store not found, select first active store
                const firstActive = data.find((s: Store) => s.isActive);
                if (firstActive) {
                  setSelectedStoreState(firstActive);
                  localStorage.setItem('selectedStoreId', firstActive.id);
                }
              }
            } else {
              // No saved store, select first active store
              const firstActive = data.find((s: Store) => s.isActive);
              if (firstActive) {
                setSelectedStoreState(firstActive);
                localStorage.setItem('selectedStoreId', firstActive.id);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStores();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status, session?.user]);

  const setSelectedStore = (store: Store | null) => {
    setSelectedStoreState(store);
    if (store) {
      localStorage.setItem('selectedStoreId', store.id);
    } else {
      localStorage.removeItem('selectedStoreId');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        selectedStore,
        setSelectedStore,
        stores,
        loading,
        refreshStores: fetchStores,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
