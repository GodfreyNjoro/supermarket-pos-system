'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, X, CheckCircle2, Loader2 } from 'lucide-react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [detectedBarcode, setDetectedBarcode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const scanningRef = useRef(false);

  const startScanning = async () => {
    try {
      setError('');
      setIsProcessing(true);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        setIsProcessing(false);

        // Initialize barcode reader
        codeReaderRef.current = new BrowserMultiFormatReader();
        
        // Wait for video to be ready
        await new Promise<void>((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => resolve();
          }
        });

        // Start continuous scanning
        scanningRef.current = true;
        continuousScan();
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available');
      setIsProcessing(false);
    }
  };

  const continuousScan = async () => {
    if (!scanningRef.current || !videoRef.current || !codeReaderRef.current) {
      return;
    }

    try {
      const result = await codeReaderRef.current.decodeFromVideoElement(videoRef.current);
      
      if (result) {
        const barcodeValue = result.getText();
        console.log('Barcode detected:', barcodeValue);
        
        // Show success feedback
        setDetectedBarcode(barcodeValue);
        
        // Stop scanning
        scanningRef.current = false;
        
        // Wait a moment to show the success state
        setTimeout(() => {
          onScan(barcodeValue);
          stopScanning();
        }, 500);
      }
    } catch (err) {
      // NotFoundException is expected when no barcode is in view
      if (!(err instanceof NotFoundException)) {
        console.error('Scan error:', err);
      }
      
      // Continue scanning if still active
      if (scanningRef.current) {
        requestAnimationFrame(() => continuousScan());
      }
    }
  };

  const stopScanning = () => {
    scanningRef.current = false;
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    
    setIsScanning(false);
    setDetectedBarcode('');
    setIsProcessing(false);
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
        disabled={isProcessing}
        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Opening Camera...</span>
          </>
        ) : (
          <>
            <Camera className="h-5 w-5" />
            <span>Scan Barcode</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-2xl mx-4">
        <button
          onClick={stopScanning}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 hover:bg-white shadow-lg transition-colors"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <h2 className="text-xl font-bold text-white">Automatic Barcode Scanner</h2>
            <p className="text-blue-100 text-sm mt-1">Point camera at barcode to scan automatically</p>
          </div>
          
          {error && (
            <div className="mx-4 mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                {/* Scanning frame */}
                <div className="w-64 h-64 border-4 border-blue-500 rounded-lg relative">
                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                  
                  {/* Scanning line animation */}
                  {!detectedBarcode && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
                    </div>
                  )}
                  
                  {/* Success indicator */}
                  {detectedBarcode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                      <div className="bg-green-500 rounded-full p-3">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Instructions */}
                {!detectedBarcode && (
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Position barcode in the frame
                    </div>
                  </div>
                )}
                
                {/* Detected barcode */}
                {detectedBarcode && (
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg">
                      ✓ {detectedBarcode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Scanning active...</span>
              </div>
              <button
                onClick={stopScanning}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cancel Scanning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
