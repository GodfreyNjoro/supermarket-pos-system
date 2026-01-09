import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');

    if (!storeId) {
      return NextResponse.json({ error: 'Missing storeId' }, { status: 400 });
    }

    const status = await prisma.syncStatus.findUnique({
      where: { storeId }
    });

    const pendingChanges = await prisma.syncLog.count({
      where: {
        storeId,
        syncedAt: null
      }
    });

    return NextResponse.json({
      ...status,
      pendingChanges,
      serverTime: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Sync status error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
