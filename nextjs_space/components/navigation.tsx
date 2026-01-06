'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  Users,
  Receipt,
  BarChart3,
  RotateCcw,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { OfflineIndicator } from '@/components/offline-indicator';
import { StoreSelector } from '@/components/store-selector';

export function Navigation() {
  const { data: session } = useSession() || {};
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === 'ADMIN';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, adminOnly: false },
    { name: 'POS/Checkout', href: '/pos', icon: ShoppingCart, adminOnly: false },
    { name: 'Products', href: '/products', icon: Package, adminOnly: true },
    { name: 'Customers', href: '/customers', icon: Users, adminOnly: true },
    { name: 'Sales', href: '/sales', icon: Receipt, adminOnly: false },
    { name: 'Reports', href: '/reports', icon: BarChart3, adminOnly: true },
    { name: 'Returns', href: '/returns', icon: RotateCcw, adminOnly: true },
  ];

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">SuperPOS</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {filteredNavigation?.map?.((item) => {
                  const isActive = pathname === item?.href;
                  const Icon = item?.icon;
                  return (
                    <Link
                      key={item?.name}
                      href={item?.href ?? '#'}
                      className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{item?.name}</span>
                    </Link>
                  );
                }) ?? null}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <OfflineIndicator />
              <StoreSelector />
              <div className="hidden text-sm text-gray-600 md:block">
                <span className="font-medium">{session?.user?.name}</span>
                <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                  {userRole}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="mb-2 border-b border-gray-200 pb-2">
                <div className="px-3 mb-2">
                  <OfflineIndicator />
                </div>
                <p className="px-3 text-sm font-medium text-gray-900">
                  {session?.user?.name}
                </p>
                <p className="px-3 text-xs text-gray-600">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                    {userRole}
                  </span>
                </p>
              </div>
              {filteredNavigation?.map?.((item) => {
                const isActive = pathname === item?.href;
                const Icon = item?.icon;
                return (
                  <Link
                    key={item?.name}
                    href={item?.href ?? '#'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item?.name}</span>
                  </Link>
                );
              }) ?? null}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
