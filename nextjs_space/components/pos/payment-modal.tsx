'use client';

import { useState } from 'react';
import { X, CreditCard, Banknote, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPayment: (paymentMethod: 'CASH' | 'CARD', amountPaid: number, changeGiven: number) => void;
}

export function PaymentModal({ total, onClose, onPayment }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD'>('CASH');
  const [amountPaid, setAmountPaid] = useState(total?.toString?.() ?? '0');
  const [isProcessing, setIsProcessing] = useState(false);

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
