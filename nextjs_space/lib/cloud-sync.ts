// Cloud sync manager for multi-location synchronization

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL || 'https://superpos.abacusai.app';

export interface SyncChange {
  entityType: string;
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  createdAt: string;
}

export interface SyncResult {
  synced: number;
  conflicts: any[];
  errors: string[];
}

export class CloudSyncManager {
  private storeId: string;
  private authToken: string | null = null;

  constructor(storeId: string) {
    this.storeId = storeId;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  // Push local changes to cloud
  async pushChanges(changes: SyncChange[]): Promise<SyncResult> {
    const response = await fetch(`${CLOUD_URL}/api/sync/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` })
      },
      credentials: 'include',
      body: JSON.stringify({
        storeId: this.storeId,
        changes
      })
    });

    if (!response.ok) {
      throw new Error(`Push failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Pull cloud changes to local
  async pullChanges(lastSyncAt: string | null): Promise<{ changes: SyncChange[]; masterData: any; serverTime: string }> {
    const response = await fetch(`${CLOUD_URL}/api/sync/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` })
      },
      credentials: 'include',
      body: JSON.stringify({
        storeId: this.storeId,
        lastSyncAt
      })
    });

    if (!response.ok) {
      throw new Error(`Pull failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get sync status from cloud
  async getStatus(): Promise<any> {
    const response = await fetch(`${CLOUD_URL}/api/sync/status?storeId=${this.storeId}`, {
      headers: {
        ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` })
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Full sync workflow
  async fullSync(localChanges: SyncChange[], lastSyncAt: string | null): Promise<{
    pushed: SyncResult;
    pulled: { changes: SyncChange[]; masterData: any };
  }> {
    // First push local changes
    const pushed = await this.pushChanges(localChanges);

    // Then pull cloud changes
    const pulled = await this.pullChanges(lastSyncAt);

    return { pushed, pulled };
  }
}

// Track changes locally for later sync
export function createSyncChange(
  entityType: string,
  entityId: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  data: any
): SyncChange {
  return {
    entityType,
    entityId,
    action,
    data,
    createdAt: new Date().toISOString()
  };
}
