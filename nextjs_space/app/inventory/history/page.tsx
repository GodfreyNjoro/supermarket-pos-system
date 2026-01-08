'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';
import { History, Search, Filter, Download } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { useStore } from '@/lib/contexts/store-context';
import { useCurrency } from '@/lib/contexts/currency-context';
import * as XLSX from 'xlsx';

interface HistoryEntry {
  id: string;
  referenceNumber: string;
  product: { name: string; barcode: string };
  user: { name: string; email: string };
  type: string;
  quantityBefore: number;
  quantityChange: number;
  quantityAfter: number;
  reason: string | null;
  createdAt: string;
}

export default function InventoryHistoryPage() {
  const { selectedStore } = useStore();
  const { formatPrice } = useCurrency();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    if (selectedStore) {
      fetchHistory();
    }
  }, [selectedStore, typeFilter, dateFrom, dateTo]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      let url = `/api/inventory/history?storeId=${selectedStore?.id}`;
      if (typeFilter) url += `&type=${typeFilter}`;
      if (dateFrom) url += `&dateFrom=${dateFrom}`;
      if (dateTo) url += `&dateTo=${dateTo}`;
      if (searchTerm) url += `&search=${searchTerm}`;

      const res = await fetch(url);
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to fetch inventory history');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchHistory();
  };

  const exportToExcel = () => {
    const data = history.map(h => ({
      'Reference': h.referenceNumber,
      'Date': new Date(h.createdAt).toLocaleDateString(),
      'Time': new Date(h.createdAt).toLocaleTimeString(),
      'Product': h.product.name,
      'Barcode': h.product.barcode,
      'Type': h.type,
      'Before': h.quantityBefore,
      'Change': h.quantityChange > 0 ? `+${h.quantityChange}` : h.quantityChange,
      'After': h.quantityAfter,
      'User': h.user.name,
      'Reason': h.reason || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory History');
    XLSX.writeFile(wb, `inventory_history_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('History exported');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'RESTOCK': return 'bg-green-100 text-green-700';
      case 'SALE': return 'bg-blue-100 text-blue-700';
      case 'DAMAGE': return 'bg-red-100 text-red-700';
      case 'LOSS': return 'bg-orange-100 text-orange-700';
      case 'ADJUSTMENT': return 'bg-purple-100 text-purple-700';
      case 'RETURN': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN', 'MANAGER', 'INVENTORY_CLERK']}>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="lg:ml-64 pt-16">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <History className="h-8 w-8 text-emerald-600" />
                    Inventory History
                  </h1>
                  <p className="mt-2 text-gray-600">Track all inventory changes with date, time, and user</p>
                </div>
                <button onClick={exportToExcel} disabled={history.length === 0}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:bg-gray-300">
                  <Download className="h-5 w-5" />
                  Export Excel
                </button>
              </div>

              {/* Filters */}
              <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Product or barcode..."
                        className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="">All Types</option>
                      <option value="RESTOCK">Restock</option>
                      <option value="SALE">Sale</option>
                      <option value="DAMAGE">Damage</option>
                      <option value="LOSS">Loss</option>
                      <option value="ADJUSTMENT">Adjustment</option>
                      <option value="RETURN">Return</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={handleSearch}
                      className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
                      <Filter className="inline h-4 w-4 mr-2" />Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* History Table */}
              <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
                  </div>
                ) : history.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((entry) => (
                          <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="font-medium text-gray-900">{new Date(entry.createdAt).toLocaleDateString()}</div>
                              <div className="text-gray-500">{new Date(entry.createdAt).toLocaleTimeString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.referenceNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{entry.product.name}</div>
                              <div className="text-xs text-gray-500">{entry.product.barcode}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getTypeColor(entry.type)}`}>
                                {entry.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={entry.quantityChange >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {entry.quantityChange >= 0 ? '+' : ''}{entry.quantityChange}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.quantityBefore} → {entry.quantityAfter}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{entry.user.name}</div>
                              <div className="text-xs text-gray-500">{entry.user.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{entry.reason || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <History className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No history found</h3>
                    <p className="mt-2 text-gray-500">Inventory changes will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
