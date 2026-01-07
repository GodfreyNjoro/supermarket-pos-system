'use client';

import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Navigation } from '@/components/navigation';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, RefreshCw, Printer, Download } from 'lucide-react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { generateBarcodeNumber, generateBarcodeSVG, printBarcode, downloadBarcode } from '@/lib/barcode-utils';
import { useCurrency } from '@/lib/contexts/currency-context';

export default function NewProductPage() {
  const router = useRouter();
  const { currency } = useCurrency();
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const barcodeRef = useRef<SVGSVGElement>(null);
  const [formData, setFormData] = useState({
    barcode: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    reorderLevel: '10',
    categoryId: '',
    supplierId: '',
    imageUrl: '',
    cloud_storage_path: '',
    isPublic: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    // Auto-generate barcode on load
    const newBarcode = generateBarcodeNumber();
    setFormData(prev => ({ ...prev, barcode: newBarcode }));
  }, []);

  // Generate barcode SVG when barcode changes
  useEffect(() => {
    if (formData.barcode && formData.barcode.length === 13) {
      // Wait for DOM to be ready
      const timer = setTimeout(() => {
        const element = document.getElementById('barcode-preview');
        if (element) {
          generateBarcodeSVG(formData.barcode, 'barcode-preview');
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [formData.barcode]);

  const regenerateBarcode = () => {
    const newBarcode = generateBarcodeNumber();
    setFormData(prev => ({ ...prev, barcode: newBarcode }));
    toast.success('New barcode generated');
  };

  const handlePrintBarcode = () => {
    if (formData.barcode) {
      printBarcode(formData.barcode, formData.name || 'New Product', parseFloat(formData.price) || undefined, currency.symbol);
    }
  };

  const handleDownloadBarcode = () => {
    if (formData.barcode) {
      downloadBarcode(formData.barcode, formData.name || 'new-product');
      toast.success('Barcode downloaded');
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

  const fetchSuppliers = async () => {
    try {
      const res = await fetch('/api/suppliers');
      const data = await res.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Get presigned URL
      const presignedRes = await fetch('/api/products/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          isPublic: true,
        }),
      });

      if (!presignedRes.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, cloud_storage_path } = await presignedRes.json();

      // Check if Content-Disposition header is required
      const url = new URL(uploadUrl);
      const signedHeaders = url.searchParams.get('X-Amz-SignedHeaders');
      const needsContentDisposition = signedHeaders?.includes?.('content-disposition');

      // Upload to S3
      const uploadHeaders: HeadersInit = {
        'Content-Type': file.type,
      };

      if (needsContentDisposition) {
        uploadHeaders['Content-Disposition'] = 'attachment';
      }

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: uploadHeaders,
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload file');
      }

      // Get the public URL
      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'your-bucket';
      const region = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';
      const imageUrl = `https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2024/03/20/1_architecture.png`;

      setFormData(prev => ({
        ...prev,
        imageUrl,
        cloud_storage_path,
      }));

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Product created successfully');
        router.push('/products');
      } else {
        const error = await res.json();
        toast.error(error?.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
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
                href="/products"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Products</span>
              </Link>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Add New Product</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                    Barcode (Auto-generated)
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="barcode"
                      type="text"
                      required
                      value={formData.barcode}
                      readOnly
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700"
                    />
                    <button
                      type="button"
                      onClick={regenerateBarcode}
                      className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                      title="Generate new barcode"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handlePrintBarcode}
                      className="rounded-lg bg-emerald-100 p-2 text-emerald-600 hover:bg-emerald-200"
                      title="Print barcode"
                    >
                      <Printer className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadBarcode}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      title="Download barcode"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Barcode Preview */}
                  <div className="mt-3 flex justify-center rounded-lg border border-gray-200 bg-white p-4">
                    <svg id="barcode-preview" ref={barcodeRef}></svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Category</option>
                      {categories?.map?.(cat => (
                        <option key={cat?.id} value={cat?.id}>
                          {cat?.name}
                        </option>
                      )) ?? null}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price *
                    </label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock Quantity *
                    </label>
                    <input
                      id="stock"
                      type="number"
                      min="0"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reorderLevel" className="block text-sm font-medium text-gray-700">
                      Reorder Level
                    </label>
                    <input
                      id="reorderLevel"
                      type="number"
                      min="0"
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                    Supplier
                  </label>
                  <select
                    id="supplier"
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Supplier (Optional)</option>
                    {suppliers?.map?.((supplier) => (
                      <option key={supplier?.id} value={supplier?.id}>
                        {supplier?.name}
                      </option>
                    )) ?? null}
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <label className="flex cursor-pointer items-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 hover:border-emerald-500">
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </span>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {formData.imageUrl && (
                      <span className="text-sm text-green-600">Image uploaded</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
                  <Link
                    href="/products"
                    className="rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex items-center space-x-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Product</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
