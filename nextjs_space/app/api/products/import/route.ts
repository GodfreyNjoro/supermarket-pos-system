import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const storeId = formData.get('storeId') as string;
    const mode = formData.get('mode') as string; // 'products' or 'restock'

    if (!file || !storeId) {
      return NextResponse.json({ error: 'Missing file or storeId' }, { status: 400 });
    }

    // Read Excel file
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    if (data.length === 0) {
      return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
    }

    const results = { created: 0, updated: 0, errors: [] as string[] };

    if (mode === 'restock') {
      // Restock mode - update existing product quantities
      for (const row of data) {
        const barcode = row.barcode?.toString() || row.Barcode?.toString();
        const quantity = parseInt(row.quantity || row.Quantity || row.stock || row.Stock || 0);

        if (!barcode) {
          results.errors.push(`Row missing barcode`);
          continue;
        }

        const product = await prisma.product.findFirst({
          where: { barcode, storeId },
        });

        if (!product) {
          results.errors.push(`Product with barcode ${barcode} not found`);
          continue;
        }

        const newStock = product.stock + quantity;
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: newStock },
        });

        // Create stock adjustment record
        await prisma.stockAdjustment.create({
          data: {
            referenceNumber: `RST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            productId: product.id,
            storeId,
            userId: (session.user as any).id,
            type: 'RESTOCK',
            quantityBefore: product.stock,
            quantityChange: quantity,
            quantityAfter: newStock,
            reason: 'Excel bulk restock',
          },
        });

        results.updated++;
      }
    } else {
      // New products mode
      const categories = await prisma.category.findMany();
      const categoryMap = new Map(categories.map((c: { name: string; id: string }) => [c.name.toLowerCase(), c.id]));

      for (const row of data) {
        const barcode = row.barcode?.toString() || row.Barcode?.toString();
        const name = row.name || row.Name || row.product || row.Product;
        const price = parseFloat(row.price || row.Price || 0);
        const stock = parseInt(row.stock || row.Stock || row.quantity || row.Quantity || 0);
        const categoryName = row.category || row.Category || '';
        const description = row.description || row.Description || '';
        const reorderLevel = parseInt(row.reorderLevel || row.ReorderLevel || row.reorder_level || 10);

        if (!barcode || !name || !price) {
          results.errors.push(`Row missing required fields: barcode=${barcode}, name=${name}, price=${price}`);
          continue;
        }

        // Check if barcode exists
        const existing = await prisma.product.findFirst({
          where: { barcode, storeId },
        });

        if (existing) {
          results.errors.push(`Product with barcode ${barcode} already exists`);
          continue;
        }

        // Find or create category
        let categoryId = categoryMap.get(categoryName.toLowerCase());
        if (!categoryId && categoryName) {
          const newCategory = await prisma.category.create({
            data: { name: categoryName },
          });
          categoryId = newCategory.id;
          categoryMap.set(categoryName.toLowerCase(), categoryId);
        }

        if (!categoryId) {
          // Use first category as default
          categoryId = categories[0]?.id;
          if (!categoryId) {
            results.errors.push(`No category found for ${name}`);
            continue;
          }
        }

        await prisma.product.create({
          data: {
            barcode,
            name,
            description,
            price,
            stock,
            reorderLevel,
            categoryId,
            storeId,
          },
        });

        results.created++;
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error importing products:', error);
    return NextResponse.json({ error: 'Failed to import products' }, { status: 500 });
  }
}
