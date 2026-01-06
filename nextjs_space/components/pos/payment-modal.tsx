'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard, Banknote, Loader2, Download, Printer } from 'lucide-react';
import { ReceiptGenerator, ReceiptData } from '@/lib/receipt-generator';
import { useSession } from 'next-auth/react';

interface PaymentModalProps {
  total: number;
  subtotal: number;
  discount: number;
  cartItems: Array<{
    product: any;
    quantity: number;
    discount: number;
    subtotal: number;
  }>;
  customer?: any;
  onClose: () => void;
  onPayment: (paymentMethod: 'CASH' | 'CARD', amountPaid: number, changeGiven: number) => void;
  saleCompleted?: boolean;
  saleData?: any;
}

export function PaymentModal({ 
  total, 
  subtotal,
  discount,
  cartItems,
  customer,
  onClose, 
  onPayment,
  saleCompleted = false,
  saleData = null
}: PaymentModalProps) {
  const { data: session } = useSession() || {};
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD'>('CASH');
  const [amountPaid, setAmountPaid] = useState(total?.toString?.() ?? '0');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQuickAmounts, setShowQuickAmounts] = useState(true);

  // Quick amount buttons for cash payment
  const quickAmounts = [
    Math.ceil(total),
    Math.ceil(total / 5) * 5, // Round up to nearest 5
    Math.ceil(total / 10) * 10, // Round up to nearest 10
    Math.ceil(total / 20) * 20, // Round up to nearest 20
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 4);

  const calculateChange = () => {
    const paid = parseFloat(amountPaid) || 0;
    return Math.max(0, paid - total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const paid = parseFloat(amountPaid) || 0;

    if (paid < total) {
      alert('Amount paid is less than total');
      return;
    }

    setIsProcessing(true);
    const changeGiven = paymentMethod === 'CASH' ? calculateChange() : 0;
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onPayment(paymentMethod, paid, changeGiven);
  };

  const generateReceiptData = (): ReceiptData => {
    const tax = subtotal * 0.1; // 10% tax
    const data = saleData || {
      id: `TEMP-${Date.now()}`,
      createdAt: new Date(),
      cashier: session?.user?.name || 'Cashier',
      customer: customer,
      items: cartItems,
      subtotal,
      discount,
      total,
      paymentMethod,
      amountPaid: parseFloat(amountPaid),
      changeGiven: calculateChange(),
    };

    return {
      saleId: data.id,
      date: new Date(data.createdAt),
      cashier: data.cashier,
      customer: data.customer ? {
        name: data.customer.name,
        email: data.customer.email,
      } : undefined,
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.subtotal,
      })),
      subtotal: data.subtotal,
      discount: data.discount || discount,
      tax,
      total: data.total,
      paymentMethod: data.paymentMethod,
      amountPaid: data.amountPaid,
      change: data.changeGiven || 0,
      storeName: 'Supermarket POS',
      storeAddress: '123 Main Street, City, State',
      storePhone: '+1 (555) 123-4567',
    };
  };

  const handleDownloadReceipt = () => {
    const receiptData = generateReceiptData();
    ReceiptGenerator.downloadPDF(receiptData);
  };

  const handlePrintReceipt = () => {
    const receiptData = generateReceiptData();
    ReceiptGenerator.printReceipt(receiptData);
  };

  // If sale is completed, show receipt options
  if (saleCompleted && saleData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-emerald-600">Payment Successful!</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6 space-y-4">
            <div className="rounded-lg bg-emerald-50 p-4 text-center">
              <p className="text-sm text-emerald-700">Transaction Complete</p>
              <p className="text-3xl font-bold text-emerald-700">
                ${saleData.total?.toFixed(2)}
              </p>
              <p className="mt-2 text-xs text-emerald-600">
                Receipt #{saleData.id}
              </p>
            </div>

            {saleData.changeGiven > 0 && (
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-700">Change Given</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${saleData.changeGiven?.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePrintReceipt}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700"
            >
              <Printer className="h-5 w-5" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleDownloadReceipt}
              className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-emerald-600 bg-white px-4 py-3 font-medium text-emerald-600 hover:bg-emerald-50"
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-700 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('CASH');
                  setAmountPaid(total?.toString?.() ?? '0');
                }}
                className={`flex flex-col items-center space-y-2 rounded-lg border-2 p-4 transition-all ${
                  paymentMethod === 'CASH'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Banknote className={`h-8 w-8 ${
                  paymentMethod === 'CASH' ? 'text-emerald-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">Cash</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('CARD');
                  setAmountPaid(total?.toString?.() ?? '0');
                }}
                className={`flex flex-col items-center space-y-2 rounded-lg border-2 p-4 transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className={`h-8 w-8 ${
                  paymentMethod === 'CARD' ? 'text-emerald-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">Card</span>
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-gray-900">${total?.toFixed?.(2) ?? '0.00'}</span>
            </div>
          </div>

          {paymentMethod === 'CASH' && (
            <>
              {/* Quick amount buttons */}
              {quickAmounts.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Amounts</label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setAmountPaid(amount.toString())}
                        className="rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">
                  Amount Paid
                </label>
                <input
                  id="amountPaid"
                  type="number"
                  step="0.01"
                  min={total}
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-lg font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="rounded-lg bg-emerald-50 p-4">
                <div className="flex justify-between text-lg">
                  <span className="text-emerald-700">Change:</span>
                  <span className="font-bold text-emerald-700">
                    ${calculateChange()?.toFixed?.(2) ?? '0.00'}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Complete Payment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
