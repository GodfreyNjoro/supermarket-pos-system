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
  private static RECEIPT_WIDTH = 72; // mm standard thermal receipt width
  private static FONT_SIZE = 8;
  private static LINE_HEIGHT = 4;
  private static MARGIN = 3;

  /**
   * Generate a PDF receipt
   */
  static generatePDF(data: ReceiptData): jsPDF {
    // Calculate dynamic height based on items
    const baseHeight = 100;
    const itemHeight = data.items.length * this.LINE_HEIGHT;
    const totalHeight = Math.max(baseHeight + itemHeight, 150);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [this.RECEIPT_WIDTH, totalHeight]
    });

    const centerX = this.RECEIPT_WIDTH / 2;
    const rightX = this.RECEIPT_WIDTH - this.MARGIN;
    let y = 8;

    // Store header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(data.storeName || 'SuperPOS', centerX, y, { align: 'center' });
    y += 5;

    // Store info
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    if (data.storeAddress) {
      doc.text(data.storeAddress, centerX, y, { align: 'center' });
      y += 3;
    }
    if (data.storePhone) {
      doc.text(`Tel: ${data.storePhone}`, centerX, y, { align: 'center' });
      y += 3;
    }

    // Separator line
    y += 1;
    doc.setLineWidth(0.2);
    doc.line(this.MARGIN, y, rightX, y);
    y += 4;

    // Receipt details
    doc.setFontSize(this.FONT_SIZE);
    doc.text(`Receipt: ${data.saleId.slice(-12)}`, this.MARGIN, y);
    y += this.LINE_HEIGHT;
    doc.text(`Date: ${data.date.toLocaleDateString()} ${data.date.toLocaleTimeString()}`, this.MARGIN, y);
    y += this.LINE_HEIGHT;
    doc.text(`Cashier: ${data.cashier}`, this.MARGIN, y);
    y += this.LINE_HEIGHT;
    if (data.customer) {
      doc.text(`Customer: ${data.customer.name}`, this.MARGIN, y);
      y += this.LINE_HEIGHT;
    }

    // Items separator
    y += 1;
    doc.line(this.MARGIN, y, rightX, y);
    y += 3;

    // Items header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('Item', this.MARGIN, y);
    doc.text('Qty', 38, y, { align: 'center' });
    doc.text('Price', 50, y, { align: 'center' });
    doc.text('Total', rightX, y, { align: 'right' });
    y += 3;
    doc.line(this.MARGIN, y, rightX, y);
    y += 3;

    // Items
    doc.setFont('helvetica', 'normal');
    data.items.forEach(item => {
      const itemName = item.name.length > 18 ? item.name.substring(0, 16) + '..' : item.name;
      doc.text(itemName, this.MARGIN, y);
      doc.text(item.quantity.toString(), 38, y, { align: 'center' });
      doc.text(`$${item.price.toFixed(2)}`, 50, y, { align: 'center' });
      doc.text(`$${item.total.toFixed(2)}`, rightX, y, { align: 'right' });
      y += this.LINE_HEIGHT;
    });

    // Totals separator
    y += 1;
    doc.line(this.MARGIN, y, rightX, y);
    y += 4;

    // Totals - right aligned
    const labelX = 35;
    doc.text('Subtotal:', labelX, y);
    doc.text(`$${data.subtotal.toFixed(2)}`, rightX, y, { align: 'right' });
    y += this.LINE_HEIGHT;

    if (data.discount > 0) {
      doc.text('Discount:', labelX, y);
      doc.text(`-$${data.discount.toFixed(2)}`, rightX, y, { align: 'right' });
      y += this.LINE_HEIGHT;
    }

    doc.text('Tax:', labelX, y);
    doc.text(`$${data.tax.toFixed(2)}`, rightX, y, { align: 'right' });
    y += this.LINE_HEIGHT;

    // Total line
    doc.setLineWidth(0.3);
    doc.line(labelX - 2, y, rightX, y);
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('TOTAL:', labelX, y);
    doc.text(`$${data.total.toFixed(2)}`, rightX, y, { align: 'right' });
    y += 5;

    // Payment info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(this.FONT_SIZE);
    doc.text(`Paid (${data.paymentMethod}):`, labelX, y);
    doc.text(`$${data.amountPaid.toFixed(2)}`, rightX, y, { align: 'right' });
    y += this.LINE_HEIGHT;

    if (data.change > 0) {
      doc.text('Change:', labelX, y);
      doc.text(`$${data.change.toFixed(2)}`, rightX, y, { align: 'right' });
      y += this.LINE_HEIGHT;
    }

    // Footer
    y += 4;
    doc.setLineWidth(0.2);
    doc.line(this.MARGIN, y, rightX, y);
    y += 4;
    doc.setFontSize(8);
    doc.text('Thank you for shopping!', centerX, y, { align: 'center' });
    y += 3;
    doc.setFontSize(7);
    doc.text('Please come again', centerX, y, { align: 'center' });

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
