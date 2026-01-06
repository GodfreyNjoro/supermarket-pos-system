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
  Star,
  Clock,
  TrendingUp,
  Filter,
  X,
  Keyboard,
} from 'lucide-react';
import { BarcodeScanner } from '@/components/pos/barcode-scanner';
import { PaymentModal } from '@/components/pos/payment-modal';
import { useSession } from 'next-auth/react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { offlineDB, OfflineTransaction } from '@/lib/indexeddb';
import { toast } from '@/hooks/use-toast';
import { useKeyboardShortcuts, formatShortcut } from '@/hooks/use-keyboard-shortcuts';
import { useStore } from '@/lib/contexts/store-context';

interface CartItem {
  product: any;
  quantity: number;
  discount: number;
  subtotal: number;
}

export default function POSPage() {
  const { data: session } = useSession() || {};
  const { isOnline } = useOnlineStatus();
  const { selectedStore } = useStore();
  const [barcode, setBarcode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]); // Store all products for filtering
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  
  // Enhanced search and filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Quick templates
  const [showQuickTemplates, setShowQuickTemplates] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [recentProducts, setRecentProducts] = useState<string[]>([]);
  
  // Keyboard shortcuts
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Load favorites and recent products from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('pos_favorites');
    const savedRecent = localStorage.getItem('pos_recent');
    if (savedFavorites) setFavoriteProducts(JSON.parse(savedFavorites));
    if (savedRecent) setRecentProducts(JSON.parse(savedRecent));
  }, []);

  useEffect(() => {
    if (selectedStore) {
      fetchProducts();
      fetchCustomers();
      fetchCategories();
    }
  }, [isOnline, selectedStore]);

  // Enhanced search with filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(p => 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.barcode?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === selectedCategory);
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'stock') {
        comparison = a.stock - b.stock;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, sortBy, sortOrder, allProducts]);

  const fetchProducts = async (search = '') => {
    try {
      if (!selectedStore) {
        return;
      }

      if (isOnline) {
        // Online: fetch from API with storeId filter
        const url = `/api/products?storeId=${selectedStore.id}`;
        const res = await fetch(url);
        const data = await res.json();
        setAllProducts(data);
        setProducts(data);
      } else {
        // Offline: fetch from IndexedDB and filter by storeId
        const cachedProducts = await offlineDB.getCachedProducts();
        const storeProducts = cachedProducts.filter(p => p.storeId === selectedStore.id);
        setAllProducts(storeProducts);
        setProducts(storeProducts);
      }
    } catch (error) {
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
      // Silently fail
    }
  };

  const fetchCategories = async () => {
    try {
      if (isOnline) {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } else {
        const cachedCategories = await offlineDB.getCachedCategories();
        setCategories(cachedCategories);
      }
    } catch (error) {
      // Silently fail
    }
  };

  // Keyboard shortcuts setup
  useKeyboardShortcuts([
    {
      key: 'F1',
      description: 'Focus barcode scanner',
      handler: () => barcodeInputRef.current?.focus(),
    },
    {
      key: 'F2',
      description: 'Open payment modal',
      handler: () => cart.length > 0 && setShowPaymentModal(true),
    },
    {
      key: 'F3',
      description: 'Clear cart',
      handler: () => cart.length > 0 && confirmClearCart(),
    },
    {
      key: 'F4',
      description: 'Toggle filters',
      handler: () => setShowFilters(!showFilters),
    },
    {
      key: 'F5',
      description: 'Toggle quick templates',
      handler: () => setShowQuickTemplates(!showQuickTemplates),
    },
    {
      key: 'Escape',
      description: 'Close modals',
      handler: () => {
        setShowPaymentModal(false);
        setShowShortcutsHelp(false);
        setShowFilters(false);
      },
    },
    {
      key: '?',
      shift: true,
      description: 'Show keyboard shortcuts',
      handler: () => setShowShortcutsHelp(true),
    },
  ]);

  // Helper functions
  const toggleFavorite = (productId: string) => {
    const newFavorites = favoriteProducts.includes(productId)
      ? favoriteProducts.filter(id => id !== productId)
      : [...favoriteProducts, productId];
    setFavoriteProducts(newFavorites);
    localStorage.setItem('pos_favorites', JSON.stringify(newFavorites));
    toast({
      title: favoriteProducts.includes(productId) ? 'Removed from favorites' : 'Added to favorites',
      duration: 2000,
    });
  };

  const addToRecentProducts = (productId: string) => {
    const newRecent = [productId, ...recentProducts.filter(id => id !== productId)].slice(0, 10);
    setRecentProducts(newRecent);
    localStorage.setItem('pos_recent', JSON.stringify(newRecent));
  };

  const confirmClearCart = () => {
    if (confirm('Are you sure you want to clear the cart?')) {
      setCart([]);
      setDiscountValue(0);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSortBy('name');
    setSortOrder('asc');
    setSearchTerm('');
  };

  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode?.trim?.()) return;

    const searchBarcode = barcode?.trim?.();
    
    const product = products?.find?.(p => {
      return p?.barcode === searchBarcode;
    });
    
    if (product) {
      addToCart(product);
      setBarcode('');
      barcodeInputRef?.current?.focus?.();
    } else {
      alert('Product not found');
    }
  };

  const addToCart = (product: any) => {
    if (product?.stock <= 0) {
      alert('Product out of stock');
      return;
    }

    // Add to recent products
    addToRecentProducts(product.id);

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
                    
                    setBarcode(code);
                    setTimeout(() => {
                      const product = products?.find?.(p => {
                        const match = p?.barcode === code;
                        return match;
                      });
                      if (product) {
                        addToCart(product);
                        setBarcode('');
                      } else {
                        alert('Product not found');
                      }
                    }, 100);
                  }} />
                </form>
              </div>

              {/* Quick Templates */}
              {showQuickTemplates && (favoriteProducts.length > 0 || recentProducts.length > 0) && (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Quick Access</h3>
                    <button onClick={() => setShowQuickTemplates(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {favoriteProducts.length > 0 && (
                      <div>
                        <div className="mb-2 flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-700">Favorites</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {allProducts.filter(p => favoriteProducts.includes(p.id)).slice(0, 4).map(product => (
                            <button
                              key={product.id}
                              onClick={() => addToCart(product)}
                              className="rounded-lg border border-gray-200 p-2 text-left text-sm hover:border-emerald-500 hover:bg-emerald-50"
                            >
                              <div className="font-medium truncate">{product.name}</div>
                              <div className="text-emerald-600">${product.price.toFixed(2)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {recentProducts.length > 0 && (
                      <div>
                        <div className="mb-2 flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">Recently Added</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {allProducts.filter(p => recentProducts.includes(p.id)).slice(0, 4).map(product => (
                            <button
                              key={product.id}
                              onClick={() => addToCart(product)}
                              className="rounded-lg border border-gray-200 p-2 text-left text-sm hover:border-emerald-500 hover:bg-emerald-50"
                            >
                              <div className="font-medium truncate">{product.name}</div>
                              <div className="text-emerald-600">${product.price.toFixed(2)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Search */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-1 items-center space-x-3">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 border-0 p-0 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`rounded-lg p-2 ${showFilters ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
                        title="Toggle Filters (F4)"
                      >
                        <Filter className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowShortcutsHelp(true)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                        title="Keyboard Shortcuts (?)"
                      >
                        <Keyboard className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {showFilters && (
                    <div className="space-y-3 rounded-lg bg-gray-50 p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded border-gray-300 text-sm"
                          >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
                          <select
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                              const [by, order] = e.target.value.split('-');
                              setSortBy(by as any);
                              setSortOrder(order as any);
                            }}
                            className="w-full rounded border-gray-300 text-sm"
                          >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="price-asc">Price (Low-High)</option>
                            <option value="price-desc">Price (High-Low)</option>
                            <option value="stock-asc">Stock (Low-High)</option>
                            <option value="stock-desc">Stock (High-Low)</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={resetFilters}
                        className="text-xs text-emerald-600 hover:text-emerald-700"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid max-h-96 gap-3 overflow-y-auto sm:grid-cols-2">
                  {products?.slice?.(0, 12)?.map?.(product => (
                    <div
                      key={product?.id}
                      className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-emerald-500 hover:shadow-md relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
                      >
                        <Star className={`h-4 w-4 ${favoriteProducts.includes(product.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                      </button>
                      <div onClick={() => addToCart(product)}>
                        <h3 className="font-medium text-gray-900 pr-6">{product?.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product?.category?.name}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-600">
                            ${product?.price?.toFixed?.(2) ?? '0.00'}
                          </span>
                          <span className="text-sm text-gray-500">Stock: {product?.stock ?? 0}</span>
                        </div>
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

      {showPaymentModal && !showReceipt && (
        <PaymentModal
          total={calculateTotal()}
          subtotal={calculateSubtotal()}
          discount={calculateDiscount()}
          cartItems={cart}
          customer={selectedCustomer}
          onClose={() => setShowPaymentModal(false)}
          onPayment={handlePayment}
        />
      )}

      {showReceipt && lastSale && (
        <PaymentModal
          total={lastSale.total}
          subtotal={lastSale.subtotal}
          discount={lastSale.discountAmount || 0}
          cartItems={lastSale.items?.map((item: any) => ({
            product: { name: item.product?.name || 'Product', price: item.unitPrice },
            quantity: item.quantity,
            discount: item.discount || 0,
            subtotal: item.subtotal,
          })) || []}
          customer={lastSale.customer}
          saleCompleted={true}
          saleData={lastSale}
          onClose={() => {
            setShowReceipt(false);
            setLastSale(null);
          }}
          onPayment={() => {}}
        />
      )}

      {/* Keyboard Shortcuts Help Dialog */}
      {showShortcutsHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Focus Barcode Scanner</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">F1</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Open Payment (if cart not empty)</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">F2</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Clear Cart</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">F3</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Toggle Filters</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">F4</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Toggle Quick Templates</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">F5</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Close Modals</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">Esc</kbd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-700">Show This Help</span>
                <kbd className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">Shift+?</kbd>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}

    </SessionGuard>
  );
}
