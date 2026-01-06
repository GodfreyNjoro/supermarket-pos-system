'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

export default function NewReturnPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState<any[]>([]);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (searchTerm) {
      fetchSales();
    }
  }, [searchTerm]);

  const fetchSales = async () => {
    try {
      const res = await fetch('/api/sales?limit=10');
      const data = await res.json();
      const filtered = data?.filter?.((sale: any) =>
        sale?.receiptNumber?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.())
      ) ?? [];
      setSales(filtered);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleSelectSale = async (sale: any) => {
    try {
      const res = await fetch(`/api/sales/${sale?.id}`);
      const fullSale = await res.json();
      setSelectedSale(fullSale);
      setSelectedItems(
        fullSale?.items?.map?.((item: any) => ({
          productId: item?.product?.id,
          productName: item?.product?.name,
          maxQuantity: item?.quantity,
          quantity: item?.quantity,
          unitPrice: item?.unitPrice,
          refundAmount: item?.subtotal,
        })) ?? []
      );
    } catch (error) {
      console.error('Error fetching sale details:', error);
      toast.error('Failed to load sale details');
    }
  };

  const updateItemQuantity = (index: number, newQuantity: number) => {
    setSelectedItems(
      selectedItems?.map?.((item, i) => {
        if (i === index) {
          const quantity = Math.max(0, Math.min(newQuantity, item?.maxQuantity));
          const refundAmount = quantity * item?.unitPrice;
          return { ...item, quantity, refundAmount };
        }
        return item;
      }) ?? []
    );
  };

  const calculateTotalRefund = () => {
    return selectedItems?.reduce?.((sum, item) => sum + item?.refundAmount, 0) ?? 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSale || !reason || selectedItems?.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    const itemsToReturn = selectedItems?.filter?.(item => item?.quantity > 0) ?? [];
    if (itemsToReturn?.length === 0) {
      toast.error('Please select at least one item to return');
      return;
    }

    setLoading(true);

    try {
      const returnData = {
        saleId: selectedSale?.id,
        reason,
        items: itemsToReturn,
        totalRefund: calculateTotalRefund(),
      };

      const res = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(returnData),
      });

      if (res.ok) {
        toast.success('Return processed successfully');
        router.push('/returns');
      } else {
        const error = await res.json();
        toast.error(error?.error || 'Failed to process return');
      }
    } catch (error) {
      console.error('Error processing return:', error);
      toast.error('Error processing return');
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
          <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link
                href="/returns"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Returns</span>
              </Link>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Process Return</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!selectedSale ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Search Receipt Number
                    </label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter receipt number..."
                        className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {sales?.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {sales?.map?.(sale => (
                          <button
                            key={sale?.id}
                            type="button"
                            onClick={() => handleSelectSale(sale)}
                            className="w-full rounded-lg border border-gray-200 p-4 text-left hover:border-emerald-500 hover:bg-emerald-50"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{sale?.receiptNumber}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(sale?.createdAt)?.toLocaleDateString?.()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${sale?.total?.toFixed?.(2) ?? '0.00'}
                                </p>
                                {sale?.customer && (
                                  <p className="text-sm text-gray-500">{sale.customer.name}</p>
                                )}
                              </div>
                            </div>
                          </button>
                        )) ?? null}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-semibold text-gray-900">Selected Sale</h3>
                      <p className="text-sm text-gray-600">Receipt: {selectedSale?.receiptNumber}</p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(selectedSale?.createdAt)?.toLocaleString?.()}
                      </p>
                      {selectedSale?.customer && (
                        <p className="text-sm text-gray-600">Customer: {selectedSale.customer.name}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSale(null);
                          setSelectedItems([]);
                        }}
                        className="mt-2 text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        Change Sale
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Items to Return
                      </label>
                      <div className="mt-2 space-y-3">
                        {selectedItems?.map?.((item, index) => (
                          <div key={index} className="rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item?.productName}</p>
                                <p className="text-sm text-gray-500">
                                  Max: {item?.maxQuantity} @ ${item?.unitPrice?.toFixed?.(2) ?? '0.00'}
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <input
                                  type="number"
                                  min="0"
                                  max={item?.maxQuantity}
                                  value={item?.quantity}
                                  onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 0)}
                                  className="w-20 rounded-lg border border-gray-300 px-3 py-1 text-center focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <span className="w-24 text-right font-semibold text-gray-900">
                                  ${item?.refundAmount?.toFixed?.(2) ?? '0.00'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )) ?? null}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason for Return *
                      </label>
                      <textarea
                        id="reason"
                        rows={3}
                        required
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter reason for return..."
                      />
                    </div>

                    <div className="rounded-lg bg-emerald-50 p-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-emerald-700">Total Refund:</span>
                        <span className="text-emerald-700">
                          ${calculateTotalRefund()?.toFixed?.(2) ?? '0.00'}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
                      <Link
                        href="/returns"
                        className="rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={loading || calculateTotalRefund() === 0}
                        className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Process Return</span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
