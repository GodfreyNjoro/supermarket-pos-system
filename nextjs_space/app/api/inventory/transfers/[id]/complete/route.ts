import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'TRANSFER_STOCK')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const transfer = await prisma.stockTransfer.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!transfer || transfer.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invalid transfer' }, { status: 400 });
    }

    // Process each item
    for (const item of transfer.items) {
      const fromProduct = await prisma.product.findFirst({
        where: { barcode: item.barcode, storeId: transfer.fromStoreId }
      });
      if (!fromProduct || fromProduct.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${item.productName}` }, { status: 400 });
      }

      // Reduce from source
      await prisma.product.update({
        where: { id: fromProduct.id },
        data: { stock: fromProduct.stock - item.quantity }
      });

      // Add to destination (or create if doesn't exist)
      const toProduct = await prisma.product.findFirst({
        where: { barcode: item.barcode, storeId: transfer.toStoreId }
      });
      if (toProduct) {
        await prisma.product.update({
          where: { id: toProduct.id },
          data: { stock: toProduct.stock + item.quantity }
        });
      } else {
        await prisma.product.create({
          data: {
            barcode: fromProduct.barcode,
            name: fromProduct.name,
            description: fromProduct.description,
            price: fromProduct.price,
            costPrice: fromProduct.costPrice,
            stock: item.quantity,
            reorderLevel: fromProduct.reorderLevel,
            categoryId: fromProduct.categoryId,
            storeId: transfer.toStoreId
          }
        });
      }

      // Create adjustment records
      await prisma.stockAdjustment.createMany({
        data: [
          {
            referenceNumber: `TRF-OUT-${Date.now()}-${item.id}`,
            productId: fromProduct.id,
            storeId: transfer.fromStoreId,
            userId: (session.user as { role: string; id: string }).id,
            type: 'TRANSFER_OUT',
            quantityBefore: fromProduct.stock,
            quantityChange: -item.quantity,
            quantityAfter: fromProduct.stock - item.quantity,
            reason: `Transfer to ${transfer.toStoreId}`
          }
        ]
      });
    }

    const updated = await prisma.stockTransfer.update({
      where: { id },
      data: { status: 'COMPLETED', completedAt: new Date() }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error completing transfer:', error);
    return NextResponse.json({ error: 'Failed to complete transfer' }, { status: 500 });
  }
}
