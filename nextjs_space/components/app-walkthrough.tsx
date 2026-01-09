'use client';

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS, EVENTS } from 'react-joyride';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface AppWalkthroughProps {
  runTour: boolean;
  onComplete: () => void;
}

export function AppWalkthrough({ runTour, onComplete }: AppWalkthroughProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [stepIndex, setStepIndex] = useState(0);

  // Define comprehensive tour steps
  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Welcome to SuperPOS! 🎉</h2>
          <p className="text-gray-700">
            Let's take a quick tour of the main features to help you get started.
            This tour will guide you through the most important parts of the system.
          </p>
          <p className="text-sm text-gray-600">
            You can skip this tour at any time or restart it later from Settings.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="nav-dashboard"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Dashboard</h3>
          <p className="text-sm text-gray-700">
            View real-time sales metrics, top products, and low stock alerts.
            Your command center for monitoring business performance.
          </p>
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="nav-pos"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Point of Sale (POS)</h3>
          <p className="text-sm text-gray-700">
            Process transactions quickly with barcode scanning, cart management,
            and multiple payment methods. Generate receipts instantly.
          </p>
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="nav-products"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Product Management</h3>
          <p className="text-sm text-gray-700">
            Manage your product catalog, track stock levels, import products via Excel,
            and generate barcodes. Keep your inventory organized.
          </p>
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="nav-inventory"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Inventory Control</h3>
          <p className="text-sm text-gray-700">
            Adjust stock levels, transfer items between stores, track inventory history,
            and monitor low stock alerts. Complete inventory management.
          </p>
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="nav-reports"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
          <p className="text-sm text-gray-700">
            Generate comprehensive reports: Sales, Inventory, Products, Financial,
            and Cashier performance. Export to Excel or PDF.
          </p>
        </div>
      ),
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="currency-selector"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Currency Selector</h3>
          <p className="text-sm text-gray-700">
            Switch between different currencies. All prices and transactions
            will automatically update to use the selected currency.
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '[data-tour="store-selector"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Store Selector</h3>
          <p className="text-sm text-gray-700">
            Switch between different store locations. View store-specific
            inventory, sales, and reports. Perfect for multi-location businesses.
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '[data-tour="online-indicator"]',
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Connection Status</h3>
          <p className="text-sm text-gray-700">
            Monitor your connection status. The system works offline and will
            automatically sync when you're back online.
          </p>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: 'body',
      content: (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Tour Complete! ✓</h2>
          <p className="text-gray-700">
            You're all set! Feel free to explore the system at your own pace.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-medium">💡 Pro Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              You can restart this tour anytime from the Help menu or by clicking
              the "Start Tour" button in Settings.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-gray-900">Quick Start Suggestions:</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Start by adding products in Product Management</li>
              <li>Process your first sale in the POS system</li>
              <li>Check the Dashboard for real-time metrics</li>
              <li>Generate reports to analyze your business</li>
            </ul>
          </div>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index } = data;

    // Update step index
    if (type === EVENTS.STEP_AFTER) {
      setStepIndex(index + 1);
    }

    // Handle tour completion or skipping
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setStepIndex(0);
      onComplete();
      // Mark tour as completed in localStorage
      localStorage.setItem('superpos-tour-completed', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#1e40af',
          zIndex: 10000,
          arrowColor: '#fff',
          backgroundColor: '#fff',
          textColor: '#374151',
        },
        tooltip: {
          borderRadius: 8,
          padding: 20,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#1e40af',
          borderRadius: 6,
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 600,
        },
        buttonBack: {
          color: '#6b7280',
          marginRight: 8,
        },
        buttonSkip: {
          color: '#6b7280',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        open: 'Open',
        skip: 'Skip Tour',
      }}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  );
}

// Hook to manage tour state
export function useAppWalkthrough() {
  const [runTour, setRunTour] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if tour has been completed
    const tourCompleted = localStorage.getItem('superpos-tour-completed');
    
    // Auto-start tour for new users (only once)
    if (status === 'authenticated' && !tourCompleted) {
      // Delay to ensure UI is fully loaded
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    // Listen for custom event to start tour manually
    const handleStartTour = () => {
      setRunTour(true);
    };

    window.addEventListener('start-tour', handleStartTour);
    return () => {
      window.removeEventListener('start-tour', handleStartTour);
    };
  }, []);

  const startTour = () => {
    setRunTour(true);
  };

  const completeTour = () => {
    setRunTour(false);
  };

  const resetTour = () => {
    localStorage.removeItem('superpos-tour-completed');
    setRunTour(true);
  };

  return {
    runTour,
    startTour,
    completeTour,
    resetTour,
  };
}
