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

    const where: Record<string, unknown> = {};
    if (storeId) {
      where.OR = [{ fromStoreId: storeId }, { toStoreId: storeId }];
    }

    const transfers = await prisma.stockTransfer.findMany({
      where,
      include: {
        fromStore: { select: { name: true } },
        toStore: { select: { name: true } },
        createdBy: { select: { name: true } },
        items: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return NextResponse.json(transfers);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    return NextResponse.json({ error: 'Failed to fetch transfers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'TRANSFER_STOCK')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const transferNumber = `TRF-${Date.now()}`;

    const transfer = await prisma.stockTransfer.create({
      data: {
        transferNumber,
        fromStoreId: data.fromStoreId,
        toStoreId: data.toStoreId,
        createdById: (session.user as { role: string; id: string }).id,
        notes: data.notes,
        items: {
          create: data.items.map((item: { barcode: string; productName: string; quantity: number }) => ({
            barcode: item.barcode,
            productName: item.productName,
            quantity: item.quantity
          }))
        }
      },
      include: { items: true }
    });
    return NextResponse.json(transfer, { status: 201 });
  } catch (error) {
    console.error('Error creating transfer:', error);
    return NextResponse.json({ error: 'Failed to create transfer' }, { status: 500 });
  }
}
