import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'VIEW_SUPPLIERS')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const order = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        supplier: true,
        store: true,
        createdBy: { select: { name: true, email: true } },
        receivedBy: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true, barcode: true, stock: true } } } }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'CREATE_PURCHASE_ORDERS')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const data = await request.json();

    // Only allow updates if status is DRAFT
    const existing = await prisma.purchaseOrder.findUnique({ where: { id } });
    if (!existing || existing.status !== 'DRAFT') {
      return NextResponse.json({ error: 'Can only update draft orders' }, { status: 400 });
    }

    const order = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
        expectedDate: data.expectedDate ? new Date(data.expectedDate) : null
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
