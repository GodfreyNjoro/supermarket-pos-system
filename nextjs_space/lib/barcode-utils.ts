import JsBarcode from 'jsbarcode';

/**
 * Generate a unique barcode number (EAN-13 format)
 */
export function generateBarcodeNumber(): string {
  // Use timestamp + random for uniqueness
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const base = timestamp + random;
  
  // Calculate EAN-13 check digit
  const checkDigit = calculateEAN13CheckDigit(base);
  return base + checkDigit;
}

/**
 * Calculate EAN-13 check digit
 */
function calculateEAN13CheckDigit(digits: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(digits[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

/**
 * Generate barcode SVG element
 */
export function generateBarcodeSVG(barcodeNumber: string, elementId: string): void {
  try {
    JsBarcode(`#${elementId}`, barcodeNumber, {
      format: 'EAN13',
      width: 2,
      height: 80,
      displayValue: true,
      fontSize: 14,
      margin: 10,
    });
  } catch (error) {
    console.error('Error generating barcode:', error);
  }
}

/**
 * Print barcode label
 */
export function printBarcode(barcodeNumber: string, productName: string, price?: number, currencySymbol?: string): void {
  const printWindow = window.open('', '_blank', 'width=400,height=300');
  if (!printWindow) {
    alert('Please allow pop-ups to print barcode');
    return;
  }

  const cs = currencySymbol || 'KSh';
  const priceDisplay = price ? `${cs} ${price.toFixed(2)}` : '';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Barcode - ${productName}</title>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
        <style>
          @page {
            size: 60mm 40mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 5mm;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .label {
            text-align: center;
            width: 50mm;
          }
          .product-name {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 2mm;
            max-width: 50mm;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            font-size: 12px;
            font-weight: bold;
            margin-top: 2mm;
          }
          svg {
            max-width: 50mm;
          }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="product-name">${productName}</div>
          <svg id="barcode"></svg>
          ${priceDisplay ? `<div class="price">${priceDisplay}</div>` : ''}
        </div>
        <script>
          JsBarcode("#barcode", "${barcodeNumber}", {
            format: "EAN13",
            width: 1.5,
            height: 50,
            displayValue: true,
            fontSize: 12,
            margin: 5
          });
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.close();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

/**
 * Download barcode as PNG
 */
export function downloadBarcode(barcodeNumber: string, productName: string): void {
  // Create a temporary canvas
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, barcodeNumber, {
    format: 'EAN13',
    width: 2,
    height: 80,
    displayValue: true,
    fontSize: 14,
    margin: 10,
  });

  // Download as PNG
  const link = document.createElement('a');
  link.download = `barcode-${productName.replace(/\s+/g, '-').toLowerCase()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
