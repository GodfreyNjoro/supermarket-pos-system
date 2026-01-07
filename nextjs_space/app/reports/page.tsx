'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, Package } from 'lucide-react';
import { useCurrency } from '@/lib/contexts/currency-context';

const COLORS = ['#10b981', '#60A5FA', '#F59E0B', '#EF4444'];

export default function ReportsPage() {
  const { formatPrice } = useCurrency();
  const [stats, setStats] = useState<any>(null);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/sales/stats?period=${period}`);
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
      <RoleGuard allowedRoles={['ADMIN']}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
              <p className="mt-2 text-gray-600">Analyze business performance</p>
            </div>

            <div className="mb-6 flex space-x-2">
              {['today', 'week', 'month']?.map?.(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    period === p
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {p?.charAt?.(0)?.toUpperCase?.() ?? ''}{p?.slice?.(1) ?? ''}
                </button>
              )) ?? null}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
              </div>
            ) : (
              <>
                <div className="mb-8 grid gap-6 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
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
                        <TrendingUp className="h-6 w-6 text-blue-600" />
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
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

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
                          label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
                        />
                        <Tooltip wrapperStyle={{ fontSize: 11 }} />
                        <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                        <Bar dataKey="total" fill="#10b981" name="Sales" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                  {stats?.salesByPaymentMethod && stats.salesByPaymentMethod?.length > 0 && (
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                      <h2 className="mb-4 text-lg font-semibold text-gray-900">Payment Methods</h2>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={stats.salesByPaymentMethod?.map?.((item: any) => ({
                              name: item?.paymentMethod,
                              value: item?._sum?.total,
                            })) ?? []}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => entry?.name}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stats.salesByPaymentMethod?.map?.((_: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            )) ?? null}
                          </Pie>
                          <Tooltip wrapperStyle={{ fontSize: 11 }} />
                          <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Products</h2>
                    <div className="space-y-3">
                      {stats?.topProducts && stats.topProducts?.length > 0 ? (
                        stats.topProducts?.slice?.(0, 5)?.map?.((item: any, index: number) => (
                          <div key={item?.product?.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{item?.product?.name}</p>
                                <p className="text-sm text-gray-500">{item?.quantity ?? 0} sold</p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatPrice(item?.revenue ?? 0)}
                            </p>
                          </div>
                        )) ?? null
                      ) : (
                        <p className="text-center text-gray-500">No data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
