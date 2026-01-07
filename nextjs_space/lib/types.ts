export interface Product {
  id: string;
  barcode: string;
  sku?: string;
  name: string;
  description?: string;
  price: number;
  costPrice: number;
  stock: number;
  reorderLevel: number;
  maxStock: number;
  categoryId: string;
  storeId: string;
  supplierId?: string;
  imageUrl?: string;
  isActive: boolean;
  expiryDate?: string;
  batchNumber?: string;
  category?: Category;
  supplier?: Supplier;
}

export interface Category {
  id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  paymentTerms?: string;
  leadTimeDays: number;
  isActive: boolean;
  rating?: number;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  storeId: string;
  status: 'DRAFT' | 'SENT' | 'PARTIAL' | 'RECEIVED' | 'CANCELLED';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  expectedDate?: string;
  receivedDate?: string;
  supplier?: Supplier;
  store?: Store;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  productId: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitCost: number;
  total: number;
  product?: Product;
}

export interface StockAdjustment {
  id: string;
  referenceNumber: string;
  productId: string;
  storeId: string;
  userId: string;
  type: string;
  quantityBefore: number;
  quantityChange: number;
  quantityAfter: number;
  reason?: string;
  batchNumber?: string;
  expiryDate?: string;
  createdAt: string;
  product?: Product;
  user?: { name: string; email: string };
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  fromStoreId: string;
  toStoreId: string;
  status: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
  fromStore?: Store;
  toStore?: Store;
  items?: StockTransferItem[];
}

export interface StockTransferItem {
  id: string;
  barcode: string;
  productName: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
}

export interface Sale {
  id: string;
  receiptNumber: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product?: Product;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'INVENTORY_CLERK';
  storeId?: string;
  isActive: boolean;
  store?: Store;
}
