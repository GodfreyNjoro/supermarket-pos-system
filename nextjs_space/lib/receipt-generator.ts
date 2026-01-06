import jsPDF from 'jspdf';

export interface ReceiptData {
  saleId: string;
  date: Date;
  cashier: string;
  customer?: {
    name: string;
    email?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
  storeName?: string;
  storeAddress?: string;
  storePhone?: string;
}

export class ReceiptGenerator {
  private static RECEIPT_WIDTH = 80; // mm for thermal printer
  private static FONT_SIZE = 10;
  private static LINE_HEIGHT = 5;

  /**
   * Generate a PDF receipt
   */
  static generatePDF(data: ReceiptData): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [this.RECEIPT_WIDTH, 297] // A4 height
    });

    let yPosition = 10;

    // Store header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(data.storeName || 'Supermarket POS', this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT + 2;

    // Store info
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    if (data.storeAddress) {
      doc.text(data.storeAddress, this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
      yPosition += this.LINE_HEIGHT;
    }
    if (data.storePhone) {
      doc.text(data.storePhone, this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
      yPosition += this.LINE_HEIGHT;
    }

    // Separator
    yPosition += 2;
    doc.text('='.repeat(40), this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;

    // Receipt details
    doc.setFontSize(this.FONT_SIZE);
    doc.text(`Receipt #: ${data.saleId}`, 5, yPosition);
    yPosition += this.LINE_HEIGHT;
    doc.text(`Date: ${data.date.toLocaleString()}`, 5, yPosition);
    yPosition += this.LINE_HEIGHT;
    doc.text(`Cashier: ${data.cashier}`, 5, yPosition);
    yPosition += this.LINE_HEIGHT;

    if (data.customer) {
      doc.text(`Customer: ${data.customer.name}`, 5, yPosition);
      yPosition += this.LINE_HEIGHT;
    }

    // Separator
    yPosition += 2;
    doc.text('-'.repeat(40), this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;

    // Items header
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 5, yPosition);
    doc.text('Qty', 45, yPosition);
    doc.text('Price', 55, yPosition);
    doc.text('Total', 68, yPosition);
    yPosition += this.LINE_HEIGHT;

    doc.text('-'.repeat(40), this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;

    // Items
    doc.setFont('helvetica', 'normal');
    data.items.forEach(item => {
      // Item name (truncate if too long)
      const itemName = item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name;
      doc.text(itemName, 5, yPosition);
      doc.text(item.quantity.toString(), 47, yPosition);
      doc.text(`$${item.price.toFixed(2)}`, 55, yPosition);
      doc.text(`$${item.total.toFixed(2)}`, 68, yPosition);
      yPosition += this.LINE_HEIGHT;
    });

    // Separator
    yPosition += 2;
    doc.text('-'.repeat(40), this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;

    // Totals
    doc.text(`Subtotal:`, 45, yPosition);
    doc.text(`$${data.subtotal.toFixed(2)}`, 68, yPosition);
    yPosition += this.LINE_HEIGHT;

    if (data.discount > 0) {
      doc.text(`Discount:`, 45, yPosition);
      doc.text(`-$${data.discount.toFixed(2)}`, 68, yPosition);
      yPosition += this.LINE_HEIGHT;
    }

    doc.text(`Tax:`, 45, yPosition);
    doc.text(`$${data.tax.toFixed(2)}`, 68, yPosition);
    yPosition += this.LINE_HEIGHT;

    // Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL:`, 45, yPosition);
    doc.text(`$${data.total.toFixed(2)}`, 68, yPosition);
    yPosition += this.LINE_HEIGHT + 2;

    // Payment info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(this.FONT_SIZE);
    doc.text(`Payment: ${data.paymentMethod}`, 45, yPosition);
    doc.text(`$${data.amountPaid.toFixed(2)}`, 68, yPosition);
    yPosition += this.LINE_HEIGHT;

    if (data.change > 0) {
      doc.text(`Change:`, 45, yPosition);
      doc.text(`$${data.change.toFixed(2)}`, 68, yPosition);
      yPosition += this.LINE_HEIGHT;
    }

    // Footer
    yPosition += 5;
    doc.text('='.repeat(40), this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;
    doc.setFontSize(8);
    doc.text('Thank you for your business!', this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });
    yPosition += this.LINE_HEIGHT;
    doc.text('Please come again', this.RECEIPT_WIDTH / 2, yPosition, { align: 'center' });

    return doc;
  }

  /**
   * Download receipt as PDF
   */
  static downloadPDF(data: ReceiptData, filename?: string): void {
    const doc = this.generatePDF(data);
    const fileName = filename || `receipt-${data.saleId}.pdf`;
    doc.save(fileName);
  }

  /**
   * Print receipt directly
   */
  static printReceipt(data: ReceiptData): void {
    const doc = this.generatePDF(data);
    
    // Open PDF in new window for printing
    const pdfDataUri = doc.output('dataurlstring');
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Receipt - ${data.saleId}</title>
            <style>
              body { margin: 0; }
              iframe { border: none; width: 100%; height: 100vh; }
            </style>
          </head>
          <body>
            <iframe src="${pdfDataUri}"></iframe>
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      alert('Please allow pop-ups to print receipt');
    }
  }

  /**
   * Generate HTML receipt for email
   */
  static generateHTML(data: ReceiptData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Courier New', monospace;
              max-width: 400px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 18px;
            }
            .header p {
              margin: 5px 0;
              font-size: 12px;
            }
            .divider {
              border-top: 1px dashed #333;
              margin: 15px 0;
            }
            .info {
              font-size: 12px;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              font-size: 12px;
              border-collapse: collapse;
            }
            th {
              text-align: left;
              border-bottom: 1px solid #333;
              padding-bottom: 5px;
            }
            td {
              padding: 5px 0;
            }
            .text-right {
              text-align: right;
            }
            .totals {
              margin-top: 15px;
              border-top: 1px solid #333;
              padding-top: 10px;
            }
            .totals table {
              width: 100%;
            }
            .totals td {
              padding: 3px 0;
            }
            .total-row {
              font-weight: bold;
              font-size: 14px;
              border-top: 2px solid #333;
              padding-top: 10px !important;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.storeName || 'Supermarket POS'}</h1>
            ${data.storeAddress ? `<p>${data.storeAddress}</p>` : ''}
            ${data.storePhone ? `<p>${data.storePhone}</p>` : ''}
          </div>

          <div class="divider"></div>

          <div class="info">
            <p><strong>Receipt #:</strong> ${data.saleId}</p>
            <p><strong>Date:</strong> ${data.date.toLocaleString()}</p>
            <p><strong>Cashier:</strong> ${data.cashier}</p>
            ${data.customer ? `<p><strong>Customer:</strong> ${data.customer.name}</p>` : ''}
          </div>

          <div class="divider"></div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right">$${item.price.toFixed(2)}</td>
                  <td class="text-right">$${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <table>
              <tr>
                <td>Subtotal:</td>
                <td class="text-right">$${data.subtotal.toFixed(2)}</td>
              </tr>
              ${data.discount > 0 ? `
              <tr>
                <td>Discount:</td>
                <td class="text-right">-$${data.discount.toFixed(2)}</td>
              </tr>
              ` : ''}
              <tr>
                <td>Tax:</td>
                <td class="text-right">$${data.tax.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td><strong>TOTAL:</strong></td>
                <td class="text-right"><strong>$${data.total.toFixed(2)}</strong></td>
              </tr>
              <tr>
                <td>Payment (${data.paymentMethod}):</td>
                <td class="text-right">$${data.amountPaid.toFixed(2)}</td>
              </tr>
              ${data.change > 0 ? `
              <tr>
                <td>Change:</td>
                <td class="text-right">$${data.change.toFixed(2)}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div class="divider"></div>

          <div class="footer">
            <p><strong>Thank you for your business!</strong></p>
            <p>Please come again</p>
          </div>
        </body>
      </html>
    `;
  }
}
