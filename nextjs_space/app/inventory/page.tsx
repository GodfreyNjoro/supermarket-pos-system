'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SessionGuard } from '@/components/session-guard';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, ArrowRightLeft, Plus, History } from 'lucide-react';
import { hasPermission } from '@/lib/permissions';
import { useStore } from '@/lib/contexts/store-context';
import { toast } from 'sonner';

interface Product {
  id: string;
  barcode: string;
  name: string;
  stock: number;
  reorderLevel: number;
  maxStock: number;
  categoryName?: string;
  storeName?: string;
  category?: { name: string };
  store?: { name: string };
}

interface StockAdjustment {
  id: string;
  referenceNumber: string;
  type: string;
  quantityBefore: number;
  quantityChange: number;
  quantityAfter: number;
  reason?: string;
  createdAt: string;
  product: { name: string; barcode: string };
  user: { name: string };
}

interface StockTransfer {
  id: string;
  transferNumber: string;
  status: string;
  createdAt: string;
  fromStore: { name: string };
  toStore: { name: string };
  items: { productName: string; quantity: number }[];
}

interface Store {
  id: string;
  name: string;
}

export default function InventoryPage() {
  const { data: session } = useSession() || {};
  const { selectedStore } = useStore();
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [transfers, setTransfers] = useState<StockTransfer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [adjustForm, setAdjustForm] = useState({ productId: '', type: 'CORRECTION', quantityChange: 0, reason: '' });
  const [transferForm, setTransferForm] = useState({ fromStoreId: '', toStoreId: '', items: [{ barcode: '', productName: '', quantity: 1 }] });

  const userRole = (session?.user as { role?: string })?.role || '';
  const canAdjust = userRole && hasPermission(userRole, 'ADJUST_INVENTORY');
  const canTransfer = userRole && hasPermission(userRole, 'TRANSFER_STOCK');

  useEffect(() => {
    fetchData();
  }, [selectedStore]);

  const fetchData = async () => {
    const storeParam = selectedStore ? `?storeId=${selectedStore.id}` : '';
    const [lowRes, adjRes, trfRes, prodRes, storesRes] = await Promise.all([
      fetch(`/api/inventory/low-stock${storeParam}`),
      fetch(`/api/inventory/adjustments${storeParam}`),
      fetch(`/api/inventory/transfers${storeParam}`),
      fetch(`/api/products${storeParam}`),
      fetch('/api/stores')
    ]);

    if (lowRes.ok) setLowStock(await lowRes.json());
    if (adjRes.ok) setAdjustments(await adjRes.json());
    if (trfRes.ok) setTransfers(await trfRes.json());
    if (prodRes.ok) setProducts(await prodRes.json());
    if (storesRes.ok) setStores(await storesRes.json());
  };

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/inventory/adjustments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adjustForm)
    });
    if (res.ok) {
      toast.success('Stock adjusted');
      setAdjustOpen(false);
      setAdjustForm({ productId: '', type: 'CORRECTION', quantityChange: 0, reason: '' });
      fetchData();
    } else {
      toast.error('Failed to adjust stock');
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/inventory/transfers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transferForm)
    });
    if (res.ok) {
      toast.success('Transfer created');
      setTransferOpen(false);
      setTransferForm({ fromStoreId: '', toStoreId: '', items: [{ barcode: '', productName: '', quantity: 1 }] });
      fetchData();
    } else {
      toast.error('Failed to create transfer');
    }
  };

  const completeTransfer = async (id: string) => {
    const res = await fetch(`/api/inventory/transfers/${id}/complete`, { method: 'POST' });
    if (res.ok) {
      toast.success('Transfer completed');
      fetchData();
    } else {
      toast.error('Failed to complete transfer');
    }
  };

  return (
    <SessionGuard>
      <div className="flex h-screen flex-col overflow-hidden">
        <Navigation />
        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">Inventory Management</h1>
              <p className="text-sm text-muted-foreground">Stock levels, adjustments, and transfers</p>
            </div>
        <div className="flex gap-2">
          {canAdjust && (
            <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
              <DialogTrigger asChild>
                <Button variant="outline"><Plus className="w-4 h-4 mr-2" /> Adjust Stock</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Stock Adjustment</DialogTitle></DialogHeader>
                <form onSubmit={handleAdjust} className="space-y-4">
                  <div>
                    <Label>Product</Label>
                    <Select value={adjustForm.productId} onValueChange={v => setAdjustForm({ ...adjustForm, productId: v })}>
                      <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                      <SelectContent>
                        {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name} ({p.stock})</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Adjustment Type</Label>
                    <Select value={adjustForm.type} onValueChange={v => setAdjustForm({ ...adjustForm, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RESTOCK">Restock</SelectItem>
                        <SelectItem value="CORRECTION">Correction</SelectItem>
                        <SelectItem value="DAMAGED">Damaged</SelectItem>
                        <SelectItem value="EXPIRED">Expired</SelectItem>
                        <SelectItem value="LOST">Lost/Shrinkage</SelectItem>
                        <SelectItem value="RETURNED">Returned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quantity Change (+ or -)</Label>
                    <Input type="number" value={adjustForm.quantityChange} onChange={e => setAdjustForm({ ...adjustForm, quantityChange: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <Label>Reason</Label>
                    <Input value={adjustForm.reason} onChange={e => setAdjustForm({ ...adjustForm, reason: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full">Submit Adjustment</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          {canTransfer && (
            <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
              <DialogTrigger asChild>
                <Button><ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer Stock</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Stock Transfer</DialogTitle></DialogHeader>
                <form onSubmit={handleTransfer} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>From Store</Label>
                      <Select value={transferForm.fromStoreId} onValueChange={v => setTransferForm({ ...transferForm, fromStoreId: v })}>
                        <SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger>
                        <SelectContent>
                          {stores.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>To Store</Label>
                      <Select value={transferForm.toStoreId} onValueChange={v => setTransferForm({ ...transferForm, toStoreId: v })}>
                        <SelectTrigger><SelectValue placeholder="Destination" /></SelectTrigger>
                        <SelectContent>
                          {stores.filter(s => s.id !== transferForm.fromStoreId).map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {transferForm.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2">
                      <Input placeholder="Barcode" value={item.barcode} onChange={e => {
                        const items = [...transferForm.items];
                        items[idx].barcode = e.target.value;
                        const prod = products.find(p => p.barcode === e.target.value);
                        if (prod) items[idx].productName = prod.name;
                        setTransferForm({ ...transferForm, items });
                      }} />
                      <Input placeholder="Product" value={item.productName} readOnly />
                      <Input type="number" min="1" value={item.quantity} onChange={e => {
                        const items = [...transferForm.items];
                        items[idx].quantity = parseInt(e.target.value) || 1;
                        setTransferForm({ ...transferForm, items });
                      }} />
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => setTransferForm({ ...transferForm, items: [...transferForm.items, { barcode: '', productName: '', quantity: 1 }] })}>
                    + Add Item
                  </Button>
                  <Button type="submit" className="w-full">Create Transfer</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStock.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transfers.filter(t => t.status === 'PENDING').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Adjustments</CardTitle>
            <History className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adjustments.filter(a => new Date(a.createdAt).toDateString() === new Date().toDateString()).length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="low-stock">
        <TabsList>
          <TabsTrigger value="low-stock">Low Stock Alerts</TabsTrigger>
          <TabsTrigger value="adjustments">Stock History</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>

        <TabsContent value="low-stock">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStock.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.storeName || item.store?.name}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.reorderLevel}</TableCell>
                      <TableCell>
                        <Badge variant={item.stock === 0 ? 'destructive' : 'secondary'}>
                          {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Before/After</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adjustments.map(adj => (
                    <TableRow key={adj.id}>
                      <TableCell className="font-mono text-xs">{adj.referenceNumber}</TableCell>
                      <TableCell>{adj.product.name}</TableCell>
                      <TableCell><Badge variant="outline">{adj.type}</Badge></TableCell>
                      <TableCell className={adj.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}>
                        {adj.quantityChange > 0 ? '+' : ''}{adj.quantityChange}
                      </TableCell>
                      <TableCell>{adj.quantityBefore} → {adj.quantityAfter}</TableCell>
                      <TableCell>{adj.user?.name}</TableCell>
                      <TableCell>{new Date(adj.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transfer #</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers.map(trf => (
                    <TableRow key={trf.id}>
                      <TableCell className="font-mono">{trf.transferNumber}</TableCell>
                      <TableCell>{trf.fromStore.name}</TableCell>
                      <TableCell>{trf.toStore.name}</TableCell>
                      <TableCell>{trf.items.length} items</TableCell>
                      <TableCell>
                        <Badge variant={trf.status === 'COMPLETED' ? 'default' : trf.status === 'PENDING' ? 'secondary' : 'destructive'}>
                          {trf.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(trf.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {trf.status === 'PENDING' && canTransfer && (
                          <Button size="sm" onClick={() => completeTransfer(trf.id)}>Complete</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </SessionGuard>
  );
}
