'use client';

import { offlineDB, OfflineTransaction } from './indexeddb';
import { toast } from '@/hooks/use-toast';

export class SyncManager {
  private static instance: SyncManager;
  private isSyncing = false;

  private constructor() {}

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  async syncAllTransactions() {
    if (this.isSyncing) {
      console.log('[SyncManager] Sync already in progress');
      return;
    }

    if (!navigator.onLine) {
      console.log('[SyncManager] Device is offline, skipping sync');
      return;
    }

    this.isSyncing = true;
    console.log('[SyncManager] Starting sync...');

    try {
      const unsyncedTransactions = await offlineDB.getUnsyncedTransactions();
      console.log(`[SyncManager] Found ${unsyncedTransactions.length} unsynced transactions`);

      if (unsyncedTransactions.length === 0) {
        this.isSyncing = false;
        return;
      }

      const results = {
        success: 0,
        failed: 0,
      };

      for (const transaction of unsyncedTransactions) {
        try {
          await this.syncTransaction(transaction);
          await offlineDB.markTransactionSynced(transaction.id);
          results.success++;
        } catch (error) {
          console.error('[SyncManager] Failed to sync transaction:', transaction.id, error);
          results.failed++;
        }
      }

      console.log('[SyncManager] Sync completed:', results);

      if (results.success > 0) {
        toast({
          title: 'Sync Complete',
          description: `Successfully synced ${results.success} transaction(s)${results.failed > 0 ? `. ${results.failed} failed.` : ''}`,
        });
      }

      if (results.failed > 0) {
        toast({
          title: 'Sync Warning',
          description: `${results.failed} transaction(s) failed to sync. Will retry on next sync.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[SyncManager] Sync error:', error);
      toast({
        title: 'Sync Error',
        description: 'Failed to sync offline transactions. Will retry later.',
        variant: 'destructive',
      });
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncTransaction(transaction: OfflineTransaction): Promise<void> {
    switch (transaction.type) {
      case 'sale':
        return this.syncSale(transaction.data);
      case 'product':
        return this.syncProduct(transaction.data);
      case 'customer':
        return this.syncCustomer(transaction.data);
      case 'return':
        return this.syncReturn(transaction.data);
      default:
        throw new Error(`Unknown transaction type: ${transaction.type}`);
    }
  }

  private async syncSale(saleData: any): Promise<void> {
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync sale: ${response.statusText}`);
    }
  }

  private async syncProduct(productData: any): Promise<void> {
    const method = productData.id ? 'PUT' : 'POST';
    const url = productData.id ? `/api/products/${productData.id}` : '/api/products';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync product: ${response.statusText}`);
    }
  }

  private async syncCustomer(customerData: any): Promise<void> {
    const method = customerData.id ? 'PUT' : 'POST';
    const url = customerData.id ? `/api/customers/${customerData.id}` : '/api/customers';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync customer: ${response.statusText}`);
    }
  }

  private async syncReturn(returnData: any): Promise<void> {
    const response = await fetch('/api/returns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(returnData),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync return: ${response.statusText}`);
    }
  }

  async cacheDataForOffline() {
    try {
      // Cache products
      const productsResponse = await fetch('/api/products');
      if (productsResponse.ok) {
        const products = await productsResponse.json();
        await offlineDB.cacheProducts(products);
      }

      // Cache customers
      const customersResponse = await fetch('/api/customers');
      if (customersResponse.ok) {
        const customers = await customersResponse.json();
        await offlineDB.cacheCustomers(customers);
      }

      // Cache categories
      const categoriesResponse = await fetch('/api/categories');
      if (categoriesResponse.ok) {
        const categories = await categoriesResponse.json();
        await offlineDB.cacheCategories(categories);
      }

      console.log('[SyncManager] Data cached successfully');
    } catch (error) {
      console.error('[SyncManager] Failed to cache data:', error);
    }
  }
}

export const syncManager = SyncManager.getInstance();
