'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to KES (base)
}

export const CURRENCIES: Currency[] = [
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.0065 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0060 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0051 },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', rate: 16.5 },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', rate: 24.0 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.12 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 10.0 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // KES default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('pos-currency');
    if (saved) {
      const found = CURRENCIES.find(c => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('pos-currency', newCurrency.code);
  };

  const convertPrice = (amount: number): number => {
    return amount * currency.rate;
  };

  const formatPrice = (amount: number): string => {
    const converted = convertPrice(amount);
    return `${currency.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Prevent hydration mismatch by using KES until mounted
  const value = {
    currency: mounted ? currency : CURRENCIES[0],
    setCurrency,
    formatPrice: mounted ? formatPrice : (amount: number) => `KSh ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    convertPrice: mounted ? convertPrice : (amount: number) => amount,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
