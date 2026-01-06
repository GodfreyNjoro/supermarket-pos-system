'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function ReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/returns');
      const data = await res.json();
      setReturns(data);
    } catch (error) {
      console.error('Error fetching returns:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN']}>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Returns & Refunds</h1>
                <p className="mt-2 text-gray-600">Process product returns</p>
              </div>
              <Link
                href="/returns/new"
                className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                <Plus className="h-5 w-5" />
                <span>New Return</span>
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
              </div>
            ) : returns?.length > 0 ? (
              <div className="space-y-4">
                {returns?.map?.(returnItem => (
                  <div key={returnItem?.id} className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-orange-100 p-2">
                          <RotateCcw className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{returnItem?.returnNumber}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(returnItem?.createdAt)?.toLocaleString?.()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">
                          -${returnItem?.totalRefund?.toFixed?.(2) ?? '0.00'}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Original Sale:</span> {returnItem?.sale?.receiptNumber}
                      </p>
                      {returnItem?.sale?.customer && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Customer:</span> {returnItem.sale.customer.name}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Reason:</span> {returnItem?.reason}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="mb-2 text-sm font-medium text-gray-700">Returned Items:</p>
                      <div className="space-y-1">
                        {returnItem?.items?.map?.((item: any) => (
                          <div key={item?.id} className="flex justify-between text-sm text-gray-600">
                            <span>{item?.product?.name} x{item?.quantity}</span>
                            <span>${item?.refundAmount?.toFixed?.(2) ?? '0.00'}</span>
                          </div>
                        )) ?? null}
                      </div>
                    </div>
                  </div>
                )) ?? null}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <RotateCcw className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No returns yet</h3>
                <p className="mt-2 text-gray-500">Returns will appear here</p>
              </div>
            )}
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
