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

    // Get all products and filter in JS
    const products = await prisma.product.findMany({
      where: storeId ? { storeId } : undefined,
      include: {
        category: { select: { name: true } },
        store: { select: { name: true } }
      },
      orderBy: { stock: 'asc' }
    });

    // Filter low stock items
    const lowStock = products
      .filter((p: { stock: number; reorderLevel: number }) => p.stock <= p.reorderLevel)
      .slice(0, 50);

    return NextResponse.json(lowStock);
  } catch (error) {
    console.error('Error fetching low stock:', error);
    return NextResponse.json({ error: 'Failed to fetch low stock' }, { status: 500 });
  }
}
