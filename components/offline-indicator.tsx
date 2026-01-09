'use client';

import { useOnlineStatus } from '@/hooks/use-online-status';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function OfflineIndicator() {
  const { isOnline, syncStatus } = useOnlineStatus();

  if (isOnline && syncStatus === 'idle') {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <Wifi className="w-3 h-3 mr-1" />
        Online
      </Badge>
    );
  }

  if (syncStatus === 'syncing') {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
        Syncing...
      </Badge>
    );
  }

  if (!isOnline) {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
        <WifiOff className="w-3 h-3 mr-1" />
        Offline Mode
      </Badge>
    );
  }

  if (syncStatus === 'error') {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <WifiOff className="w-3 h-3 mr-1" />
        Sync Error
      </Badge>
    );
  }

  return null;
}
