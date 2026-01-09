import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'VIEW_INVENTORY')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');
    const productId = searchParams.get('productId');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};
    if (storeId) where.storeId = storeId;
    if (productId) where.productId = productId;
    if (type) where.type = type;

    const adjustments = await prisma.stockAdjustment.findMany({
      where,
      include: {
        product: { select: { name: true, barcode: true } },
        user: { select: { name: true, email: true } },
        store: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return NextResponse.json(adjustments);
  } catch (error) {
    console.error('Error fetching adjustments:', error);
    return NextResponse.json({ error: 'Failed to fetch adjustments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'ADJUST_INVENTORY')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const product = await prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const quantityBefore = product.stock;
    const quantityAfter = quantityBefore + data.quantityChange;
    if (quantityAfter < 0) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    const referenceNumber = `ADJ-${Date.now()}`;

    const [adjustment] = await prisma.$transaction([
      prisma.stockAdjustment.create({
        data: {
          referenceNumber,
          productId: data.productId,
          storeId: product.storeId,
          userId: (session.user as { role: string; id: string }).id,
          type: data.type,
          quantityBefore,
          quantityChange: data.quantityChange,
          quantityAfter,
          reason: data.reason,
          batchNumber: data.batchNumber,
          expiryDate: data.expiryDate ? new Date(data.expiryDate) : null
        }
      }),
      prisma.product.update({
        where: { id: data.productId },
        data: { stock: quantityAfter }
      })
    ]);

    return NextResponse.json(adjustment, { status: 201 });
  } catch (error) {
    console.error('Error creating adjustment:', error);
    return NextResponse.json({ error: 'Failed to create adjustment' }, { status: 500 });
  }
}
