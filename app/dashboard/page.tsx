'use client';

import { SessionGuard } from '@/components/session-guard';
import { Navigation } from '@/components/navigation';
import { PageWrapper } from '@/components/page-wrapper';
import { useEffect, useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useStore } from '@/lib/contexts/store-context';
import { useCurrency } from '@/lib/contexts/currency-context';

interface Stats {
  totalSales: number;
  totalTransactions: number;
  salesByDay: Array<{ date: string; total: number; count: number }>;
  topProducts: Array<{
    product: any;
    quantity: number;
    revenue: number;
  }>;
  lowStockProducts: Array<any>;
  salesByPaymentMethod: Array<{
    paymentMethod: string;
    _sum: { total: number };
    _count: number;
  }>;
}

export default function DashboardPage() {
  const { selectedStore } = useStore();
  const { formatPrice } = useCurrency();
  const [stats, setStats] = useState<Stats | null>(null);
  const [period, setPeriod] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedStore) {
      fetchStats();
    }
  }, [period, selectedStore]);

  const fetchStats = async () => {
    try {
      if (!selectedStore) {
        return;
      }

      setLoading(true);
      const res = await fetch(`/api/sales/stats?period=${period}&storeId=${selectedStore.id}`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <PageWrapper>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Monitor your supermarket performance</p>
          </div>

          {/* Period selector */}
          <div className="mb-6 flex space-x-2">
            {['today', 'week', 'month']?.map?.((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {p?.charAt?.(0)?.toUpperCase?.() ?? ''}{ p?.slice?.(1) ?? ''}
              </button>
            )) ?? null}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Sales</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {formatPrice(stats?.totalSales ?? 0)}
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-100 p-3">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Transactions</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stats?.totalTransactions ?? 0}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-3">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {formatPrice(stats?.totalTransactions && stats?.totalSales
                          ? stats.totalSales / stats.totalTransactions
                          : 0)}
                      </p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {stats?.lowStockProducts?.length ?? 0}
                      </p>
                    </div>
                    <div className="rounded-full bg-red-100 p-3">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Chart */}
              {stats?.salesByDay && stats.salesByDay?.length > 0 && (
                <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Sales Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.salesByDay}>
                      <XAxis 
                        dataKey="date" 
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        label={{ value: 'Date', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11 } }}
                      />
                      <YAxis 
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                        label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
                      />
                      <Tooltip wrapperStyle={{ fontSize: 11 }} />
                      <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="total" fill="#10b981" name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Products */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {stats?.topProducts && stats.topProducts?.length > 0 ? (
                      stats.topProducts?.slice?.(0, 5)?.map?.((item, index) => (
                        <div
                          key={item?.product?.id}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item?.product?.name}</p>
                              <p className="text-sm text-gray-500">
                                {item?.quantity ?? 0} sold
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatPrice(item?.revenue ?? 0)}
                            </p>
                          </div>
                        </div>
                      )) ?? null
                    ) : (
                      <p className="text-center text-gray-500">No data available</p>
                    )}
                  </div>
                </div>

                {/* Low Stock Alert */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="space-y-3">
                    {stats?.lowStockProducts && stats.lowStockProducts?.length > 0 ? (
                      stats.lowStockProducts?.slice?.(0, 5)?.map?.((product) => (
                        <div
                          key={product?.id}
                          className="flex items-center justify-between rounded-lg bg-red-50 p-3"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{product?.name}</p>
                            <p className="text-sm text-gray-500">{product?.category?.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-red-600">
                              {product?.stock ?? 0} left
                            </p>
                            <p className="text-xs text-gray-500">
                              Min: {product?.reorderLevel ?? 0}
                            </p>
                          </div>
                        </div>
                      )) ?? null
                    ) : (
                      <p className="text-center text-gray-500">All products well stocked</p>
                    )}
                  </div>
                  <Link
                    href="/products"
                    className="mt-4 block text-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
          </PageWrapper>
      </div>
    </SessionGuard>
  );
}
