'use client';

import { SessionGuard } from '@/components/session-guard';
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';
import { Receipt, CreditCard, Banknote, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sales?limit=50');
      const data = await res.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionGuard>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
            <p className="mt-2 text-gray-600">View all transactions</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
            </div>
          ) : sales?.length > 0 ? (
            <div className="space-y-4">
              {sales?.map?.(sale => (
                <div key={sale?.id} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-emerald-100 p-2">
                        <Receipt className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{sale?.receiptNumber}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(sale?.createdAt)?.toLocaleString?.()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        ${sale?.total?.toFixed?.(2) ?? '0.00'}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Cashier: {sale?.user?.name ?? 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {sale?.paymentMethod === 'CASH' ? (
                        <Banknote className="h-4 w-4 text-gray-400" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-600">
                        {sale?.paymentMethod}
                      </span>
                    </div>
                    {sale?.customer && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Customer: {sale.customer.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Items:</p>
                    <div className="space-y-1">
                      {sale?.items?.map?.((item: any) => (
                        <div key={item?.id} className="flex justify-between text-sm text-gray-600">
                          <span>{item?.product?.name} x{item?.quantity}</span>
                          <span>${item?.subtotal?.toFixed?.(2) ?? '0.00'}</span>
                        </div>
                      )) ?? null}
                    </div>
                  </div>
                </div>
              )) ?? null}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <Receipt className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No sales yet</h3>
              <p className="mt-2 text-gray-500">Sales will appear here</p>
            </div>
          )}
        </main>
      </div>
    </SessionGuard>
  );
}
