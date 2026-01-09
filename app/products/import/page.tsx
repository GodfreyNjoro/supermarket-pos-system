'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useState } from 'react';
import { ArrowLeft, Upload, FileSpreadsheet, Download, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useStore } from '@/lib/contexts/store-context';
import * as XLSX from 'xlsx';

export default function ImportProductsPage() {
  const { selectedStore } = useStore();
  const [mode, setMode] = useState<'products' | 'restock'>('products');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ created?: number; updated?: number; errors?: string[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedStore) {
      toast.error('Please select a file and store');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('storeId', selectedStore.id);
      formData.append('mode', mode);

      const res = await fetch('/api/products/import', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data);
        if (mode === 'products' && data.created > 0) {
          toast.success(`${data.created} products imported successfully`);
        } else if (mode === 'restock' && data.updated > 0) {
          toast.success(`${data.updated} products restocked successfully`);
        }
        if (data.errors?.length > 0) {
          toast.error(`${data.errors.length} errors occurred`);
        }
      } else {
        toast.error(data.error || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing:', error);
      toast.error('Failed to import file');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = (type: 'products' | 'restock') => {
    const headers = type === 'products'
      ? ['barcode', 'name', 'description', 'price', 'stock', 'category', 'reorderLevel']
      : ['barcode', 'quantity'];
    
    const sampleData = type === 'products'
      ? [['1234567890123', 'Sample Product', 'Product description', 100, 50, 'Groceries', 10]]
      : [['1234567890001', 20], ['1234567890002', 15]];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `${type}_template.xlsx`);
    toast.success('Template downloaded');
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN']}>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link href="/products" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Products</span>
              </Link>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Import Products / Restock</h1>

              {/* Mode Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Import Mode</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMode('products')}
                    className={`flex-1 rounded-lg border-2 p-4 text-center transition ${mode === 'products' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <FileSpreadsheet className={`mx-auto h-8 w-8 mb-2 ${mode === 'products' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div className={`font-medium ${mode === 'products' ? 'text-emerald-700' : 'text-gray-700'}`}>New Products</div>
                    <div className="text-xs text-gray-500 mt-1">Add new products from Excel</div>
                  </button>
                  <button
                    onClick={() => setMode('restock')}
                    className={`flex-1 rounded-lg border-2 p-4 text-center transition ${mode === 'restock' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <Upload className={`mx-auto h-8 w-8 mb-2 ${mode === 'restock' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className={`font-medium ${mode === 'restock' ? 'text-blue-700' : 'text-gray-700'}`}>Restock Items</div>
                    <div className="text-xs text-gray-500 mt-1">Update stock quantities</div>
                  </button>
                </div>
              </div>

              {/* Download Template */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Download Template</h3>
                    <p className="text-sm text-gray-500">Get the Excel template for {mode === 'products' ? 'new products' : 'restocking'}</p>
                  </div>
                  <button
                    onClick={() => downloadTemplate(mode)}
                    className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    <Download className="h-4 w-4" />
                    Template
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Excel File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {file ? file.name : 'Click to select Excel file (.xlsx, .xls)'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || !selectedStore || loading}
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                  <><Upload className="h-5 w-5" /> Import {mode === 'products' ? 'Products' : 'Restock Data'}</>
                )}
              </button>

              {/* Results */}
              {results && (
                <div className="mt-6 rounded-lg border p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Import Results</h3>
                  <div className="space-y-2">
                    {results.created !== undefined && results.created > 0 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>{results.created} products created</span>
                      </div>
                    )}
                    {results.updated !== undefined && results.updated > 0 && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>{results.updated} products restocked</span>
                      </div>
                    )}
                    {results.errors && results.errors.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                          <XCircle className="h-5 w-5" />
                          <span>{results.errors.length} errors</span>
                        </div>
                        <ul className="text-sm text-red-600 bg-red-50 rounded p-3 max-h-40 overflow-y-auto">
                          {results.errors.map((err, i) => (
                            <li key={i}>• {err}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 text-sm text-gray-500">
                <h4 className="font-medium text-gray-700 mb-2">Instructions:</h4>
                {mode === 'products' ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Required columns: barcode, name, price</li>
                    <li>Optional columns: description, stock, category, reorderLevel</li>
                    <li>Categories will be created automatically if they don&apos;t exist</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Required columns: barcode, quantity</li>
                    <li>Products must already exist in the system</li>
                    <li>Quantity will be added to existing stock</li>
                  </ul>
                )}
              </div>
            </div>
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
