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
  Truck,
  Boxes,
  UserCog,
  History,
  ChevronDown,
  ChevronRight,
  Pin,
  PinOff,
  Settings,
  Database,
  HelpCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { OfflineIndicator } from '@/components/offline-indicator';
import { StoreSelector } from '@/components/store-selector';
import { CurrencySelector } from '@/components/currency-selector';
import { useSidebar } from '@/components/page-wrapper';

export function Navigation() {
  const { data: session } = useSession() || {};
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inventoryExpanded, setInventoryExpanded] = useState(
    pathname?.startsWith('/inventory') || pathname?.startsWith('/suppliers')
  );
  const [isHovered, setIsHovered] = useState(false);
  const { isPinned, setIsPinned } = useSidebar();

  // Listen for tour start event to expand inventory submenu
  useEffect(() => {
    const handleTourStart = () => {
      setInventoryExpanded(true);
    };

    window.addEventListener('start-tour', handleTourStart);
    return () => {
      window.removeEventListener('start-tour', handleTourStart);
    };
  }, []);

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const sidebarVisible = isPinned || isHovered;

  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === 'ADMIN';
  const isCashier = userRole === 'CASHIER';
  const isManagerOrAdmin = userRole === 'ADMIN' || userRole === 'MANAGER';
  const isInventoryOrAbove = isManagerOrAdmin || userRole === 'INVENTORY_CLERK';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, show: true, tourId: 'nav-dashboard' },
    { name: 'POS', href: '/pos', icon: ShoppingCart, show: true, tourId: 'nav-pos' },
    { name: 'Products', href: '/products', icon: Package, show: isManagerOrAdmin, tourId: 'nav-products' },
    { name: 'Customers', href: '/customers', icon: Users, show: isManagerOrAdmin },
    { name: 'Sales', href: '/sales', icon: Receipt, show: true },
    { name: 'Reports', href: '/reports', icon: BarChart3, show: isManagerOrAdmin, tourId: 'nav-reports' },
    { name: 'Returns', href: '/returns', icon: RotateCcw, show: isManagerOrAdmin },
    { name: 'Users', href: '/users', icon: UserCog, show: isAdmin },
    { name: 'Settings', href: '/settings/database', icon: Settings, show: isAdmin },
  ];

  const inventorySubMenu = [
    { name: 'Stock Management', href: '/inventory', icon: Boxes, tourId: 'nav-inventory' },
    { name: 'Suppliers', href: '/suppliers', icon: Truck },
    { name: 'History', href: '/inventory/history', icon: History },
  ];

  const filteredNavigation = navigation.filter((item) => item.show);

  // Cashiers get top navigation only
  if (isCashier) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">SuperPOS</span>
              </Link>
            </div>
            <div className="hidden md:flex items-baseline space-x-4">
              {[{ name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
                { name: 'POS', href: '/pos', icon: ShoppingCart },
                { name: 'Sales', href: '/sales', icon: Receipt }].map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-4">
              <OfflineIndicator />
              <CurrencySelector />
              <StoreSelector />
              <span className="hidden md:block text-sm font-medium text-gray-600">{session?.user?.name}</span>
              <button onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Non-cashiers get left sidebar navigation
  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mr-4 lg:hidden">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">SuperPOS</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div data-tour="online-indicator">
              <OfflineIndicator />
            </div>
            <div data-tour="currency-selector">
              <CurrencySelector />
            </div>
            <div data-tour="store-selector">
              <StoreSelector />
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">{session?.user?.name}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{userRole}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center space-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white transition-all duration-300 ${
          mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${sidebarVisible ? 'w-64' : 'w-16'}`}
      >
        {/* Pin/Unpin Button */}
        <div className="hidden lg:flex items-center justify-end px-3 pt-3">
          <button
            onClick={togglePin}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
          </button>
        </div>
        <nav className={`h-full overflow-y-auto px-3 ${sidebarVisible ? 'py-2' : 'py-4'}`}>
          <ul className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    title={!sidebarVisible ? item.name : undefined}
                    data-tour={(item as any).tourId}
                    className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
                    } ${sidebarVisible ? 'space-x-3' : 'justify-center'}`}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarVisible && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}

            {/* Inventory section with submenu */}
            {isInventoryOrAbove && (
              <li>
                {sidebarVisible ? (
                  <>
                    <button onClick={() => setInventoryExpanded(!inventoryExpanded)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname?.startsWith('/inventory') || pathname?.startsWith('/suppliers')
                          ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}>
                      <div className="flex items-center space-x-3">
                        <Boxes className="h-5 w-5" />
                        <span>Inventory</span>
                      </div>
                      {inventoryExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {inventoryExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-gray-200 pl-4">
                        {inventorySubMenu.map((sub) => {
                          const isActive = pathname === sub.href;
                          const Icon = sub.icon;
                          return (
                            <li key={sub.name}>
                              <Link 
                                href={sub.href} 
                                onClick={() => setMobileMenuOpen(false)}
                                data-tour={(sub as any).tourId}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                  isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
                                }`}>
                                <Icon className="h-4 w-4" />
                                <span>{sub.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="/inventory" title="Inventory"
                    className={`flex items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      pathname?.startsWith('/inventory') || pathname?.startsWith('/suppliers')
                        ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>
                    <Boxes className="h-5 w-5" />
                  </Link>
                )}
              </li>
            )}

            {/* Start Tour Button */}
            <li className="mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  localStorage.removeItem('superpos-tour-completed');
                  window.dispatchEvent(new CustomEvent('start-tour'));
                  setMobileMenuOpen(false);
                }}
                title={!sidebarVisible ? 'Start Tour' : undefined}
                className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors ${
                  sidebarVisible ? 'space-x-3' : 'justify-center'
                }`}
              >
                <HelpCircle className="h-5 w-5 flex-shrink-0" />
                {sidebarVisible && <span>Start Tour</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
