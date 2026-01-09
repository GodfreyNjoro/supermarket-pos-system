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
    if (!hasPermission((session.user as { role: string; id: string }).role, 'VIEW_SUPPLIERS')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (storeId) where.storeId = storeId;
    if (status) where.status = status;

    const orders = await prisma.purchaseOrder.findMany({
      where,
      include: {
        supplier: { select: { name: true, code: true } },
        store: { select: { name: true } },
        createdBy: { select: { name: true } },
        _count: { select: { items: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'CREATE_PURCHASE_ORDERS')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const orderNumber = `PO-${Date.now()}`;

    const itemsData = data.items.map((item: { productId: string; orderedQuantity: number; unitCost: number }) => ({
      productId: item.productId,
      orderedQuantity: item.orderedQuantity,
      unitCost: item.unitCost,
      total: item.orderedQuantity * item.unitCost
    }));

    const subtotal = itemsData.reduce((sum: number, item: { total: number }) => sum + item.total, 0);
    const tax = data.tax || 0;
    const shipping = data.shipping || 0;
    const total = subtotal + tax + shipping;

    const order = await prisma.purchaseOrder.create({
      data: {
        orderNumber,
        supplierId: data.supplierId,
        storeId: data.storeId,
        createdById: (session.user as { role: string; id: string }).id,
        status: 'DRAFT',
        subtotal,
        tax,
        shipping,
        total,
        notes: data.notes,
        expectedDate: data.expectedDate ? new Date(data.expectedDate) : null,
        items: { create: itemsData }
      },
      include: { items: true, supplier: true }
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating purchase order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
