'use client';

import { SessionGuard } from '@/components/session-guard';
import { Navigation } from '@/components/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Percent,
  DollarSign,
  User,
  ShoppingCart,
  Printer,
  WifiOff,
} from 'lucide-react';
import { BarcodeScanner } from '@/components/pos/barcode-scanner';
import { PaymentModal } from '@/components/pos/payment-modal';
import { useSession } from 'next-auth/react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { offlineDB, OfflineTransaction } from '@/lib/indexeddb';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  product: any;
  quantity: number;
  discount: number;
  subtotal: number;
}

export default function POSPage() {
  const { data: session } = useSession() || {};
  const { isOnline } = useOnlineStatus();
  const [barcode, setBarcode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, [isOnline]);

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      fetchProducts();
    }
  }, [searchTerm]);

  const fetchProducts = async (search = '') => {
    try {
      if (isOnline) {
        // Online: fetch from API
        const url = search ? `/api/products?search=${search}` : '/api/products';
        console.log('🌐 Fetching products from API:', url);
        const res = await fetch(url);
        const data = await res.json();
        console.log('✅ Products fetched from API:', data.length, 'products');
        console.log('📋 Product barcodes:', data.map((p: any) => `${p.barcode} - ${p.name}`));
        setProducts(data);
      } else {
        // Offline: fetch from IndexedDB
        const cachedProducts = await offlineDB.getCachedProducts();
        if (search) {
          const filtered = cachedProducts.filter(p => 
            p.name?.toLowerCase()?.includes(search.toLowerCase()) ||
            p.barcode?.includes(search)
          );
          console.log('💾 Loaded filtered products from cache:', filtered.length, 'products');
          setProducts(filtered);
        } else {
          console.log('💾 Loaded products from cache:', cachedProducts.length, 'products');
          setProducts(cachedProducts);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    }
  };

  const fetchCustomers = async () => {
    try {
      if (isOnline) {
        // Online: fetch from API
        const res = await fetch('/api/customers');
        const data = await res.json();
        setCustomers(data);
      } else {
        // Offline: fetch from IndexedDB
        const cachedCustomers = await offlineDB.getCachedCustomers();
        setCustomers(cachedCustomers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode?.trim?.()) return;

    const searchBarcode = barcode?.trim?.();
    console.log('🔍 Searching for barcode:', searchBarcode);
    console.log('📦 Total products available:', products?.length);
    console.log('📋 All barcodes in products:', products?.map(p => p?.barcode));
    
    const product = products?.find?.(p => {
      console.log(`Comparing "${p?.barcode}" === "${searchBarcode}":`, p?.barcode === searchBarcode);
      return p?.barcode === searchBarcode;
    });
    
    if (product) {
      console.log('✅ Product found:', product.name);
      addToCart(product);
      setBarcode('');
      barcodeInputRef?.current?.focus?.();
    } else {
      console.log('❌ Product not found for barcode:', searchBarcode);
      alert('Product not found');
    }
  };

  const addToCart = (product: any) => {
    if (product?.stock <= 0) {
      alert('Product out of stock');
      return;
    }

    const existingItem = cart?.find?.(item => item?.product?.id === product?.id);
    
    if (existingItem) {
      if (existingItem?.quantity >= product?.stock) {
        alert('Cannot add more than available stock');
        return;
      }
      updateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        discount: 0,
        subtotal: product?.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart?.map?.(item => {
        if (item?.product?.id === productId) {
          const maxQuantity = item?.product?.stock;
          const quantity = Math.min(newQuantity, maxQuantity);
          const subtotal = (item?.product?.price * quantity) - (item?.discount || 0);
          return { ...item, quantity, subtotal };
        }
        return item;
      }) ?? []
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart?.filter?.(item => item?.product?.id !== productId) ?? []);
  };

  const calculateSubtotal = () => {
    return cart?.reduce?.((sum, item) => sum + item?.subtotal, 0) ?? 0;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (discountType === 'PERCENTAGE') {
      return (subtotal * discountValue) / 100;
    }
    return discountValue;
  };

  const calculateTotal = () => {
    return Math.max(0, calculateSubtotal() - calculateDiscount());
  };

  const handlePayment = async (paymentMethod: 'CASH' | 'CARD', amountPaid: number, changeGiven: number) => {
    try {
      const saleData = {
        customerId: selectedCustomer?.id || null,
        items: cart?.map?.(item => ({
          productId: item?.product?.id,
          quantity: item?.quantity,
          unitPrice: item?.product?.price,
          discount: item?.discount,
          subtotal: item?.subtotal,
        })) ?? [],
        subtotal: calculateSubtotal(),
        discountType: discountValue > 0 ? discountType : null,
        discountValue: discountValue > 0 ? discountValue : 0,
        discountAmount: calculateDiscount(),
        total: calculateTotal(),
        paymentMethod,
        amountPaid,
        changeGiven,
      };

      if (isOnline) {
        // Online: process sale immediately
        const res = await fetch('/api/sales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saleData),
        });

        if (res.ok) {
          const sale = await res.json();
          setLastSale(sale);
          setShowPaymentModal(false);
          setShowReceipt(true);
          toast({
            title: 'Sale Complete',
            description: 'Transaction processed successfully',
          });
          // Clear cart
          setCart([]);
          setSelectedCustomer(null);
          setDiscountValue(0);
        } else {
          alert('Failed to process sale');
        }
      } else {
        // Offline: queue transaction for later sync
        const offlineTransaction: OfflineTransaction = {
          id: `offline-sale-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          type: 'sale',
          data: saleData,
          synced: false,
        };

        await offlineDB.addTransaction(offlineTransaction);

        // Create a mock sale object for receipt
        const mockSale = {
          id: offlineTransaction.id,
          ...saleData,
          createdAt: new Date().toISOString(),
          user: session?.user,
        };

        setLastSale(mockSale);
        setShowPaymentModal(false);
        setShowReceipt(true);
        
        toast({
          title: 'Sale Queued (Offline)',
          description: 'Transaction saved locally and will sync when online',
        });

        // Clear cart
        setCart([]);
        setSelectedCustomer(null);
        setDiscountValue(0);
      }
    } catch (error) {
      console.error('Error processing sale:', error);
      toast({
        title: 'Error',
        description: 'Failed to process sale',
        variant: 'destructive',
      });
    }
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <SessionGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
            <p className="mt-2 text-gray-600">Scan products and process transactions</p>
          </div>

          {!isOnline && (
            <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center">
                <WifiOff className="h-5 w-5 text-amber-600 mr-3" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">Offline Mode</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    You're working offline. Sales will be processed using cached data and synced when you're back online.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Panel - Products & Barcode Scanner */}
            <div className="lg:col-span-2 space-y-6">
              {/* Barcode Scanner */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Barcode Scanner</h2>
                <form onSubmit={handleBarcodeSubmit} className="flex space-x-3">
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Scan or enter barcode..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700"
                  >
                    Add
                  </button>
                  <BarcodeScanner onScan={(code) => {
                    console.log('📷 Camera scanned barcode:', code);
                    console.log('📦 Products available at scan time:', products?.length);
                    console.log('📋 Barcodes at scan time:', products?.map(p => p?.barcode));
                    
                    setBarcode(code);
                    setTimeout(() => {
                      console.log('🔍 Looking for product with barcode:', code);
                      const product = products?.find?.(p => {
                        const match = p?.barcode === code;
                        console.log(`  Checking "${p?.barcode}" === "${code}":`, match, p?.name);
                        return match;
                      });
                      if (product) {
                        console.log('✅ Found product from camera:', product.name);
                        addToCart(product);
                        setBarcode('');
                      } else {
                        console.log('❌ No product found for camera-scanned barcode:', code);
                        alert('Product not found');
                      }
                    }, 100);
                  }} />
                </form>
              </div>

              {/* Product Search */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center space-x-3">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 border-0 p-0 focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="grid max-h-96 gap-3 overflow-y-auto sm:grid-cols-2">
                  {products?.slice?.(0, 12)?.map?.(product => (
                    <div
                      key={product?.id}
                      onClick={() => addToCart(product)}
                      className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-emerald-500 hover:shadow-md"
                    >
                      <h3 className="font-medium text-gray-900">{product?.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product?.category?.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">
                          ${product?.price?.toFixed?.(2) ?? '0.00'}
                        </span>
                        <span className="text-sm text-gray-500">Stock: {product?.stock ?? 0}</span>
                      </div>
                    </div>
                  )) ?? null}
                </div>
              </div>
            </div>

            {/* Right Panel - Cart */}
            <div className="space-y-6">
              {/* Customer Selection */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Customer</h3>
                </div>
                <select
                  value={selectedCustomer?.id || ''}
                  onChange={(e) => {
                    const customer = customers?.find?.(c => c?.id === e.target.value);
                    setSelectedCustomer(customer || null);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Walk-in Customer</option>
                  {customers?.map?.(customer => (
                    <option key={customer?.id} value={customer?.id}>
                      {customer?.name} {customer?.phone ? `(${customer.phone})` : ''}
                    </option>
                  )) ?? null}
                </select>
              </div>

              {/* Cart */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Cart ({cart?.length ?? 0})</h3>
                </div>
                
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {cart?.length > 0 ? (
                    cart?.map?.(item => (
                      <div key={item?.product?.id} className="rounded-lg bg-gray-50 p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item?.product?.name}</h4>
                            <p className="text-sm text-gray-500">
                              ${item?.product?.price?.toFixed?.(2) ?? '0.00'} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item?.product?.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item?.product?.id, item?.quantity - 1)}
                              className="rounded-md bg-gray-200 p-1 hover:bg-gray-300"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item?.quantity ?? 0}</span>
                            <button
                              onClick={() => updateQuantity(item?.product?.id, item?.quantity + 1)}
                              className="rounded-md bg-gray-200 p-1 hover:bg-gray-300"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ${item?.subtotal?.toFixed?.(2) ?? '0.00'}
                          </span>
                        </div>
                      </div>
                    )) ?? null
                  ) : (
                    <p className="py-8 text-center text-gray-500">Cart is empty</p>
                  )}
                </div>

                {/* Discount */}
                {cart?.length > 0 && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="mb-2 flex items-center space-x-2">
                      <Percent className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Discount</span>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as any)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="PERCENTAGE">%</option>
                        <option value="FIXED">$</option>
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${calculateSubtotal()?.toFixed?.(2) ?? '0.00'}</span>
                  </div>
                  {discountValue > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-medium text-red-600">
                        -${calculateDiscount()?.toFixed?.(2) ?? '0.00'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-emerald-600">${calculateTotal()?.toFixed?.(2) ?? '0.00'}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cart?.length === 0}
                  className="mt-4 w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showPaymentModal && (
        <PaymentModal
          total={calculateTotal()}
          onClose={() => setShowPaymentModal(false)}
          onPayment={handlePayment}
        />
      )}

      {/* Receipt Modal */}
      {showReceipt && lastSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Receipt</h2>
              <p className="mt-2 text-sm text-gray-600">Transaction Successful</p>
            </div>

            <div className="mb-6 space-y-2 border-y border-gray-200 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Receipt #:</span>
                <span className="font-medium">{lastSale?.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(lastSale?.createdAt)?.toLocaleDateString?.()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cashier:</span>
                <span className="font-medium">{session?.user?.name}</span>
              </div>
              {lastSale?.customer && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{lastSale.customer.name}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-gray-900">Items</h3>
              <div className="space-y-2">
                {lastSale?.items?.map?.((item: any) => (
                  <div key={item?.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item?.product?.name} x{item?.quantity}
                    </span>
                    <span className="font-medium">${item?.subtotal?.toFixed?.(2) ?? '0.00'}</span>
                  </div>
                )) ?? null}
              </div>
            </div>

            <div className="mb-6 space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${lastSale?.subtotal?.toFixed?.(2) ?? '0.00'}</span>
              </div>
              {lastSale?.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-red-600">
                    -${lastSale.discountAmount?.toFixed?.(2) ?? '0.00'}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-emerald-600">${lastSale?.total?.toFixed?.(2) ?? '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{lastSale?.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">${lastSale?.amountPaid?.toFixed?.(2) ?? '0.00'}</span>
              </div>
              {lastSale?.changeGiven > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Change:</span>
                  <span className="font-medium">${lastSale.changeGiven?.toFixed?.(2) ?? '0.00'}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={printReceipt}
                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                <Printer className="h-5 w-5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => {
                  setShowReceipt(false);
                  setLastSale(null);
                }}
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </SessionGuard>
  );
}
