'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { PageWrapper } from '@/components/page-wrapper';
import { useEffect, useState } from 'react';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Calendar,
  Filter,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  Loader2,
} from 'lucide-react';
import { useCurrency } from '@/lib/contexts/currency-context';
import { useStore } from '@/lib/contexts/store-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import toast from 'react-hot-toast';
import {
  exportToExcel,
  exportToPDF,
  exportComplexPDF,
  formatCurrency,
  formatDate,
  formatDateTime,
} from '@/lib/report-utils';

type ReportType =
  | 'sales'
  | 'inventory'
  | 'products'
  | 'financial'
  | 'cashier';

export default function ReportsPage() {
  const { formatPrice, currency } = useCurrency();
  const { selectedStore } = useStore();
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // Filters
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [groupBy, setGroupBy] = useState('day');
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    if (selectedStore) {
      fetchReport();
    }
  }, [reportType, selectedStore]);

  const fetchReport = async () => {
    if (!selectedStore) {
      toast.error('Please select a store');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
        storeId: selectedStore.id,
      });

      if (reportType === 'sales') {
        params.append('groupBy', groupBy);
      }

      if (reportType === 'inventory' && lowStockOnly) {
        params.append('lowStockOnly', 'true');
      }

      const res = await fetch(`/api/reports/${reportType}?${params}`);
      if (!res.ok) throw new Error('Failed to fetch report');

      const data = await res.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (!reportData) {
      toast.error('No data to export');
      return;
    }

    const config = {
      title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
      subtitle: `${selectedStore?.name} - ${startDate} to ${endDate}`,
      filename: `${reportType}_report`,
      currencySymbol: currency.symbol,
    };

    let success = false;

    switch (reportType) {
      case 'sales':
        success = exportToExcel(
          reportData.transactions.map((t: any) => ({
            'Receipt #': t.receiptNumber,
            Date: formatDateTime(t.date),
            Total: formatCurrency(t.total, currency.symbol),
            'Payment Method': t.paymentMethod,
            Cashier: t.cashier,
            Store: t.store,
            Items: t.itemsCount,
          })),
          config,
          'Transactions'
        );
        break;

      case 'inventory':
        success = exportToExcel(
          reportData.products.map((p: any) => ({
            Name: p.name,
            Barcode: p.barcode,
            Category: p.category,
            Store: p.store,
            'Current Stock': p.stock,
            'Reorder Level': p.reorderLevel,
            Price: formatCurrency(p.price, currency.symbol),
            'Stock Value': formatCurrency(p.stockValue, currency.symbol),
          })),
          config,
          'Inventory'
        );
        break;

      case 'products':
        success = exportToExcel(
          reportData.allProducts.map((p: any) => ({
            Name: p.name,
            Barcode: p.barcode,
            Category: p.category,
            'Quantity Sold': p.quantitySold,
            Revenue: formatCurrency(p.revenue, currency.symbol),
            Transactions: p.transactions,
            'Current Stock': p.currentStock,
          })),
          config,
          'Products'
        );
        break;

      case 'financial':
        success = exportToExcel(
          reportData.transactions.map((t: any) => ({
            'Receipt #': t.receiptNumber,
            Date: formatDateTime(t.date),
            Total: formatCurrency(t.total, currency.symbol),
            'Payment Method': t.paymentMethod,
          })),
          config,
          'Transactions'
        );
        break;

      case 'cashier':
        success = exportToExcel(
          reportData.cashierPerformance.map((c: any) => ({
            Name: c.name,
            Role: c.role,
            'Total Sales': formatCurrency(c.totalSales, currency.symbol),
            Transactions: c.transactionCount,
            'Avg Transaction': formatCurrency(c.averageTransaction, currency.symbol),
            'Cash Sales': formatCurrency(c.cashSales, currency.symbol),
            'Card Sales': formatCurrency(c.cardSales, currency.symbol),
          })),
          config,
          'Cashier Performance'
        );
        break;
    }

    if (success) {
      toast.success('Report exported to Excel successfully');
    } else {
      toast.error('Failed to export report');
    }
  };

  const handleExportPDF = () => {
    if (!reportData) {
      toast.error('No data to export');
      return;
    }

    const config = {
      title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
      subtitle: `${selectedStore?.name} - ${startDate} to ${endDate}`,
      filename: `${reportType}_report`,
      currencySymbol: currency.symbol,
    };

    let success = false;

    switch (reportType) {
      case 'sales':
        success = exportToPDF(
          reportData.transactions.slice(0, 100).map((t: any) => ({
            receiptNumber: t.receiptNumber,
            date: formatDate(t.date),
            total: formatCurrency(t.total, currency.symbol),
            paymentMethod: t.paymentMethod,
            cashier: t.cashier,
          })),
          [
            { header: 'Receipt #', dataKey: 'receiptNumber' },
            { header: 'Date', dataKey: 'date' },
            { header: 'Total', dataKey: 'total' },
            { header: 'Payment', dataKey: 'paymentMethod' },
            { header: 'Cashier', dataKey: 'cashier' },
          ],
          config
        );
        break;

      case 'inventory':
        success = exportToPDF(
          reportData.products.slice(0, 100).map((p: any) => ({
            name: p.name,
            barcode: p.barcode,
            category: p.category,
            stock: p.stock,
            reorderLevel: p.reorderLevel,
            stockValue: formatCurrency(p.stockValue, currency.symbol),
          })),
          [
            { header: 'Name', dataKey: 'name' },
            { header: 'Barcode', dataKey: 'barcode' },
            { header: 'Category', dataKey: 'category' },
            { header: 'Stock', dataKey: 'stock' },
            { header: 'Reorder', dataKey: 'reorderLevel' },
            { header: 'Value', dataKey: 'stockValue' },
          ],
          config
        );
        break;

      case 'products':
        success = exportToPDF(
          reportData.topSellers.slice(0, 50).map((p: any) => ({
            name: p.name,
            category: p.category,
            quantitySold: p.quantitySold,
            revenue: formatCurrency(p.revenue, currency.symbol),
            transactions: p.transactions,
          })),
          [
            { header: 'Product', dataKey: 'name' },
            { header: 'Category', dataKey: 'category' },
            { header: 'Qty Sold', dataKey: 'quantitySold' },
            { header: 'Revenue', dataKey: 'revenue' },
            { header: 'Transactions', dataKey: 'transactions' },
          ],
          config
        );
        break;

      case 'financial':
        // For financial, create a complex PDF with multiple sections
        success = exportComplexPDF(
          [
            {
              title: 'Financial Summary',
              data: [
                {
                  metric: 'Gross Revenue',
                  value: formatCurrency(reportData.summary.grossRevenue, currency.symbol),
                },
                {
                  metric: 'Total Returns',
                  value: formatCurrency(reportData.summary.totalReturns, currency.symbol),
                },
                {
                  metric: 'Net Revenue',
                  value: formatCurrency(reportData.summary.netRevenue, currency.symbol),
                },
                {
                  metric: 'Gross Profit',
                  value: formatCurrency(reportData.summary.grossProfit, currency.symbol),
                },
                {
                  metric: 'Gross Margin',
                  value: `${reportData.summary.grossMargin.toFixed(2)}%`,
                },
              ],
              columns: [
                { header: 'Metric', dataKey: 'metric' },
                { header: 'Value', dataKey: 'value' },
              ],
            },
          ],
          config
        );
        break;

      case 'cashier':
        success = exportToPDF(
          reportData.cashierPerformance.map((c: any) => ({
            name: c.name,
            transactions: c.transactionCount,
            totalSales: formatCurrency(c.totalSales, currency.symbol),
            avgTransaction: formatCurrency(c.averageTransaction, currency.symbol),
          })),
          [
            { header: 'Cashier', dataKey: 'name' },
            { header: 'Transactions', dataKey: 'transactions' },
            { header: 'Total Sales', dataKey: 'totalSales' },
            { header: 'Avg Transaction', dataKey: 'avgTransaction' },
          ],
          config
        );
        break;
    }

    if (success) {
      toast.success('Report exported to PDF successfully');
    } else {
      toast.error('Failed to export report');
    }
  };

  const renderReportContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      );
    }

    if (!reportData) {
      return (
        <div className="py-12 text-center">
          <p className="text-gray-500">Select a report type and click Generate Report</p>
        </div>
      );
    }

    switch (reportType) {
      case 'sales':
        return <SalesReportContent data={reportData} formatPrice={formatPrice} />;
      case 'inventory':
        return <InventoryReportContent data={reportData} formatPrice={formatPrice} />;
      case 'products':
        return <ProductsReportContent data={reportData} formatPrice={formatPrice} />;
      case 'financial':
        return <FinancialReportContent data={reportData} formatPrice={formatPrice} />;
      case 'cashier':
        return <CashierReportContent data={reportData} formatPrice={formatPrice} />;
      default:
        return null;
    }
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN', 'MANAGER']}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <PageWrapper>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="mt-2 text-gray-600">
                  Generate comprehensive reports and export them in Excel or PDF format
                </p>
              </div>

              {/* Report Type Selection */}
              <Card className="mb-6 p-6">
                <div className="mb-4">
                  <Label className="text-base font-semibold">Select Report Type</Label>
                </div>
                <div className="grid gap-4 md:grid-cols-5">
                  <Button
                    variant={reportType === 'sales' ? 'default' : 'outline'}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setReportType('sales')}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Sales Report
                  </Button>
                  <Button
                    variant={reportType === 'inventory' ? 'default' : 'outline'}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setReportType('inventory')}
                  >
                    <Package className="h-4 w-4" />
                    Inventory
                  </Button>
                  <Button
                    variant={reportType === 'products' ? 'default' : 'outline'}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setReportType('products')}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Products
                  </Button>
                  <Button
                    variant={reportType === 'financial' ? 'default' : 'outline'}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setReportType('financial')}
                  >
                    <DollarSign className="h-4 w-4" />
                    Financial
                  </Button>
                  <Button
                    variant={reportType === 'cashier' ? 'default' : 'outline'}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setReportType('cashier')}
                  >
                    <Users className="h-4 w-4" />
                    Cashier
                  </Button>
                </div>
              </Card>

              {/* Filters */}
              <Card className="mb-6 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <Label className="text-base font-semibold">Filters</Label>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  {reportType === 'sales' && (
                    <div>
                      <Label htmlFor="group-by">Group By</Label>
                      <Select value={groupBy} onValueChange={setGroupBy}>
                        <SelectTrigger id="group-by" className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex items-end">
                    <Button onClick={fetchReport} className="w-full" disabled={loading}>
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Export Actions */}
              {reportData && (
                <Card className="mb-6 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">Export Report:</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportExcel}
                        className="flex items-center gap-2"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        Export to Excel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportPDF}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Export to PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Report Content */}
              <Card className="p-6">{renderReportContent()}</Card>
            </div>
          </PageWrapper>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}

// Sales Report Content Component
function SalesReportContent({ data, formatPrice }: any) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Revenue</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.totalRevenue)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Transactions</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalTransactions}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Average Transaction</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.averageTransaction)}
          </div>
        </Card>
      </div>

      {/* Payment Method Breakdown */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Payment Methods</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(data.byPaymentMethod).map(([method, stats]: any) => (
            <Card key={method} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">{method}</div>
                  <div className="mt-1 text-xl font-bold text-gray-900">
                    {formatPrice(stats.total)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{stats.count} transactions</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Receipt #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cashier
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.transactions.slice(0, 20).map((t: any) => (
                <tr key={t.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {t.receiptNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {formatDateTime(t.date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {formatPrice(t.total)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {t.paymentMethod}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {t.cashier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inventory Report Content Component
function InventoryReportContent({ data, formatPrice }: any) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Products</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalProducts}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Stock Value</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.totalStockValue)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Low Stock Items</div>
          <div className="mt-2 text-2xl font-bold text-orange-600">
            {data.summary.lowStockCount}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Out of Stock</div>
          <div className="mt-2 text-2xl font-bold text-red-600">
            {data.summary.outOfStockCount}
          </div>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {data.lowStockItems.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Current Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reorder Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.lowStockItems.slice(0, 15).map((p: any) => (
                  <tr key={p.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                      {p.category}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-orange-600 font-semibold">
                      {p.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                      {p.reorderLevel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {formatPrice(p.stockValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Products */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">All Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Barcode
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.products.slice(0, 20).map((p: any) => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {p.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {p.barcode}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {p.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {p.stock}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {formatPrice(p.price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {formatPrice(p.stockValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Products Report Content Component
function ProductsReportContent({ data, formatPrice }: any) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Products Sold</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalProductsSold}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Quantity Sold</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalQuantitySold}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Revenue</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.totalRevenue)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">No Sales</div>
          <div className="mt-2 text-2xl font-bold text-orange-600">
            {data.summary.productsWithNoSales}
          </div>
        </Card>
      </div>

      {/* Top Sellers */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Qty Sold
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Transactions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.topSellers.slice(0, 20).map((p: any, index: number) => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-emerald-600">
                    #{index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {p.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {p.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {p.quantitySold}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-semibold">
                    {formatPrice(p.revenue)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {p.transactions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slow Movers */}
      {data.slowMovers.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Slow Moving Products</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Qty Sold
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Current Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.slowMovers.slice(0, 15).map((p: any) => (
                  <tr key={p.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                      {p.category}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-orange-600">
                      {p.quantitySold}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                      {formatPrice(p.revenue)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                      {p.currentStock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Financial Report Content Component
function FinancialReportContent({ data, formatPrice }: any) {
  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Gross Revenue</div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">
            {formatPrice(data.summary.grossRevenue)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Returns</div>
          <div className="mt-2 text-2xl font-bold text-red-600">
            {formatPrice(data.summary.totalReturns)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Net Revenue</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.netRevenue)}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Cost of Goods Sold</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.cogs)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Gross Profit</div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">
            {formatPrice(data.summary.grossProfit)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Gross Margin</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.grossMargin.toFixed(2)}%
          </div>
        </Card>
      </div>

      {/* Payment Method Breakdown */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Payment Method Breakdown</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(data.paymentMethodBreakdown).map(([method, stats]: any) => (
            <Card key={method} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">{method}</div>
                  <div className="mt-1 text-xl font-bold text-gray-900">
                    {formatPrice(stats.total)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{stats.count} transactions</div>
                  <div className="text-xs text-gray-500">
                    {((stats.total / data.summary.grossRevenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Returns Summary */}
      {data.returns.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Returns ({data.returns.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Refund Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.returns.slice(0, 10).map((ret: any) => (
                  <tr key={ret.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                      {formatDateTime(ret.date)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-red-600 font-semibold">
                      {formatPrice(ret.refundAmount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {ret.reason || 'Not specified'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Cashier Report Content Component
function CashierReportContent({ data, formatPrice }: any) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Cashiers</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalCashiers}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Transactions</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {data.summary.totalTransactions}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Total Sales</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.totalSales)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-gray-600">Avg Transaction</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(data.summary.averageTransactionSize)}
          </div>
        </Card>
      </div>

      {/* Cashier Performance */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Cashier Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cashier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Transactions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Sales
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Avg Transaction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Items/Trans
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.cashierPerformance.map((c: any, index: number) => (
                <tr key={c.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-emerald-600">
                    #{index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {c.role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {c.transactionCount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 font-semibold">
                    {formatPrice(c.totalSales)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {formatPrice(c.averageTransaction)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {c.averageItemsPerTransaction?.toFixed(1) || '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method Split per Cashier */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Payment Method Split</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.cashierPerformance.map((c: any) => (
            <Card key={c.id} className="p-4">
              <div className="mb-2 font-medium text-gray-900">{c.name}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cash:</span>
                  <span className="font-semibold text-emerald-600">
                    {formatPrice(c.cashSales)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Card:</span>
                  <span className="font-semibold text-blue-600">
                    {formatPrice(c.cardSales)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
