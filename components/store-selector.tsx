'use client';

import { useStore } from '@/lib/contexts/store-context';
import { useSession } from 'next-auth/react';
import { Store, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function StoreSelector() {
  const { data: session } = useSession() || {};
  const { selectedStore, setSelectedStore, stores, loading } = useStore();

  // If user is not authenticated, don't show the selector
  if (!session) {
    return null;
  }

  const userRole = (session?.user as any)?.role;
  const userStoreId = (session?.user as any)?.storeId;
  const isAdmin = userRole === 'ADMIN';

  // Cashiers are locked to their store, so no selector needed
  if (!isAdmin && userStoreId) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm">
        <Store className="h-4 w-4 text-emerald-600" />
        <span className="font-medium text-emerald-900">
          {selectedStore?.name || 'Loading...'}
        </span>
      </div>
    );
  }

  // Admins can switch between stores
  if (isAdmin) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-emerald-200 hover:bg-emerald-50"
            disabled={loading}
          >
            <Store className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">
              {loading ? 'Loading...' : selectedStore?.name || 'Select Store'}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Switch Store</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {stores
            .filter((store) => store.isActive)
            .map((store) => (
              <DropdownMenuItem
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={
                  selectedStore?.id === store.id
                    ? 'bg-emerald-50 font-medium text-emerald-900'
                    : ''
                }
              >
                <Store className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{store.name}</span>
                  {store.address && (
                    <span className="text-xs text-gray-500">{store.address}</span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          {stores.length === 0 && (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              No stores available
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}
