import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// Send cloud changes to local store
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeId, lastSyncAt } = await request.json();

    if (!storeId) {
      return NextResponse.json({ error: 'Missing storeId' }, { status: 400 });
    }

    const since = lastSyncAt ? new Date(lastSyncAt) : new Date(0);

    // Get all changes since last sync for this store or global changes
    const changes = await prisma.syncLog.findMany({
      where: {
        syncedAt: { gte: since },
        storeId: { not: storeId } // Exclude own changes
      },
      orderBy: { createdAt: 'asc' }
    });

    // Also get master data that should sync to all stores
    const masterData = {
      categories: await prisma.category.findMany({
        where: { updatedAt: { gte: since } }
      }),
      suppliers: await prisma.supplier.findMany({
        where: { updatedAt: { gte: since } }
      })
    };

    return NextResponse.json({
      changes,
      masterData,
      serverTime: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Sync pull error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
