'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useStore } from '@/lib/contexts/store-context';

export default function ProductsPage() {
  const { selectedStore } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    if (selectedStore) {
      fetchProducts();
      fetchCategories();
    }
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStore) {
      fetchProducts();
    }
  }, [selectedCategory, showLowStock]);

  const fetchProducts = async () => {
    try {
      if (!selectedStore) {
        return;
      }

      setLoading(true);
      let url = `/api/products?storeId=${selectedStore.id}&`;
      if (searchTerm) url += `search=${searchTerm}&`;
      if (selectedCategory) url += `categoryId=${selectedCategory}&`;
      if (showLowStock) url += 'lowStock=true&';

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN']}>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="mt-2 text-gray-600">Manage your inventory</p>
              </div>
              <Link
                href="/products/new"
                className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
                    placeholder="Search by name or barcode..."
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">All Categories</option>
                    {categories?.map?.(cat => (
                      <option key={cat?.id} value={cat?.id}>
                        {cat?.name}
                      </option>
                    )) ?? null}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showLowStock}
                      onChange={(e) => setShowLowStock(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Low Stock Only</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchProducts}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
              </div>
            ) : products?.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products?.map?.(product => (
                  <div key={product?.id} className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                      {product?.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product?.name ?? 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{product?.name}</h3>
                      <p className="text-sm text-gray-500">{product?.category?.name}</p>
                      <p className="mt-1 text-xs text-gray-400">Barcode: {product?.barcode}</p>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">
                          ${product?.price?.toFixed?.(2) ?? '0.00'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          (product?.stock ?? 0) <= (product?.reorderLevel ?? 0)
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}>
                          Stock: {product?.stock ?? 0}
                        </p>
                        <p className="text-xs text-gray-400">Min: {product?.reorderLevel ?? 0}</p>
                      </div>
                    </div>

                    {(product?.stock ?? 0) <= (product?.reorderLevel ?? 0) && (
                      <div className="mb-4 flex items-center space-x-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Low Stock</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Link
                        href={`/products/${product?.id}/edit`}
                        className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(product?.id, product?.name)}
                        className="flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )) ?? null}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <Package className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-500">Get started by adding your first product</p>
                <Link
                  href="/products/new"
                  className="mt-4 inline-flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Product</span>
                </Link>
              </div>
            )}
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
