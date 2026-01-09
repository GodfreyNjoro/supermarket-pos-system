import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable?: { finalY: number };
  }
}

export interface ReportConfig {
  title: string;
  subtitle?: string;
  filename: string;
  currencySymbol?: string;
}

// Excel Export Functions
export const exportToExcel = (
  data: any[],
  config: ReportConfig,
  sheetName: string = 'Report'
) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${config.filename}_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

export const exportMultiSheetExcel = (
  sheets: { name: string; data: any[] }[],
  config: ReportConfig
) => {
  try {
    const workbook = XLSX.utils.book_new();

    sheets.forEach((sheet) => {
      const worksheet = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${config.filename}_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);
    return true;
  } catch (error) {
    console.error('Error exporting multi-sheet Excel:', error);
    return false;
  }
};

// PDF Export Functions
export const exportToPDF = (
  data: any[],
  columns: { header: string; dataKey: string }[],
  config: ReportConfig
) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add title
    doc.setFontSize(18);
    doc.text(config.title, pageWidth / 2, 15, { align: 'center' });

    // Add subtitle if provided
    if (config.subtitle) {
      doc.setFontSize(12);
      doc.text(config.subtitle, pageWidth / 2, 22, { align: 'center' });
    }

    // Add date
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString();
    doc.text(`Generated: ${date}`, pageWidth / 2, 28, { align: 'center' });

    // Add table
    doc.autoTable({
      startY: 35,
      head: [columns.map((col) => col.header)],
      body: data.map((row) => columns.map((col) => row[col.dataKey] ?? '')),
      theme: 'striped',
      headStyles: {
        fillColor: [16, 185, 129], // emerald-600
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    // Save PDF
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${config.filename}_${timestamp}.pdf`;
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
};

export const exportComplexPDF = (
  sections: {
    title?: string;
    data: any[];
    columns: { header: string; dataKey: string }[];
  }[],
  config: ReportConfig
) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let currentY = 15;

    // Add main title
    doc.setFontSize(18);
    doc.text(config.title, pageWidth / 2, currentY, { align: 'center' });
    currentY += 7;

    // Add subtitle if provided
    if (config.subtitle) {
      doc.setFontSize(12);
      doc.text(config.subtitle, pageWidth / 2, currentY, { align: 'center' });
      currentY += 6;
    }

    // Add date
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString();
    doc.text(`Generated: ${date}`, pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    // Add each section
    sections.forEach((section, index) => {
      // Add section title if provided
      if (section.title) {
        doc.setFontSize(14);
        doc.text(section.title, 14, currentY);
        currentY += 7;
      }

      // Add table
      doc.autoTable({
        startY: currentY,
        head: [section.columns.map((col) => col.header)],
        body: section.data.map((row) =>
          section.columns.map((col) => row[col.dataKey] ?? '')
        ),
        theme: 'striped',
        headStyles: {
          fillColor: [16, 185, 129],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
      });

      currentY = doc.lastAutoTable?.finalY ?? currentY + 10;
      currentY += 10;

      // Add new page if needed (except for last section)
      if (index < sections.length - 1 && currentY > 250) {
        doc.addPage();
        currentY = 15;
      }
    });

    // Save PDF
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${config.filename}_${timestamp}.pdf`;
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting complex PDF:', error);
    return false;
  }
};

// Format currency for reports
export const formatCurrency = (amount: number, symbol: string = 'KSh') => {
  return `${symbol} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Format date for reports
export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format datetime for reports
export const formatDateTime = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
