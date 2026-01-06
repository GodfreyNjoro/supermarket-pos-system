'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, X, ScanBarcode } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setError('');
      const stream = await navigator?.mediaDevices?.getUserMedia?.({ video: { facingMode: 'environment' } });
      if (videoRef?.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const stopScanning = () => {
    if (streamRef?.current) {
      streamRef.current?.getTracks?.()?.forEach?.(track => track?.stop?.());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const captureBarcode = () => {
    // In a real implementation, you would use a barcode detection library
    // For demo purposes, we'll use manual entry
    const barcode = prompt('Enter barcode:');
    if (barcode) {
      onScan(barcode);
      stopScanning();
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  if (!isScanning) {
    return (
      <button
        onClick={startScanning}
        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Camera className="h-5 w-5" />
        <span>Scan Barcode</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6">
        <button
          onClick={stopScanning}
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="mb-4 text-xl font-bold text-gray-900">Barcode Scanner</h2>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        
        <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={captureBarcode}
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
          >
            <ScanBarcode className="h-5 w-5" />
            <span>Capture Barcode</span>
          </button>
          <button
            onClick={stopScanning}
            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
