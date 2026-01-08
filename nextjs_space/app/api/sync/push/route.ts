import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

// Receive sync data from local stores and merge into cloud
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { changes, storeId } = await request.json();

    if (!changes || !storeId) {
      return NextResponse.json({ error: 'Missing changes or storeId' }, { status: 400 });
    }

    const results = {
      synced: 0,
      conflicts: [] as any[],
      errors: [] as string[]
    };

    for (const change of changes) {
      try {
        const { entityType, entityId, action, data, createdAt } = change;

        // Check for conflicts - if cloud version is newer
        const existingLog = await prisma.syncLog.findFirst({
          where: {
            entityType,
            entityId,
            createdAt: { gt: new Date(createdAt) }
          },
          orderBy: { createdAt: 'desc' }
        });

        if (existingLog) {
          // Conflict: cloud has newer data
          results.conflicts.push({
            entityType,
            entityId,
            localData: data,
            cloudData: existingLog.data,
            resolution: 'cloud_wins' // Latest timestamp wins
          });
          continue;
        }

        // Apply the change to cloud database
        await applyChange(entityType, entityId, action, data, storeId);

        // Log the sync
        await prisma.syncLog.create({
          data: {
            entityType,
            entityId,
            action,
            data,
            storeId,
            syncedAt: new Date()
          }
        });

        results.synced++;
      } catch (error: any) {
        results.errors.push(`Failed to sync ${change.entityType}/${change.entityId}: ${error.message}`);
      }
    }

    // Update sync status
    await prisma.syncStatus.upsert({
      where: { storeId },
      create: {
        storeId,
        lastSyncAt: new Date(),
        pendingCount: 0
      },
      update: {
        lastSyncAt: new Date(),
        pendingCount: 0,
        lastError: results.errors.length > 0 ? results.errors[0] : null
      }
    });

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Sync push error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function applyChange(entityType: string, entityId: string, action: string, data: any, storeId: string) {
  switch (entityType) {
    case 'Product':
      if (action === 'CREATE') {
        await prisma.product.create({ data: { ...data, id: entityId } });
      } else if (action === 'UPDATE') {
        await prisma.product.update({ where: { id: entityId }, data });
      } else if (action === 'DELETE') {
        await prisma.product.update({ where: { id: entityId }, data: { isActive: false } });
      }
      break;

    case 'Sale':
      if (action === 'CREATE') {
        const { items, ...saleData } = data;
        await prisma.sale.create({
          data: {
            ...saleData,
            id: entityId,
            items: { create: items }
          }
        });
      }
      break;

    case 'StockAdjustment':
      if (action === 'CREATE') {
        await prisma.stockAdjustment.create({ data: { ...data, id: entityId } });
        // Also update product stock
        if (data.productId && data.quantityChange) {
          await prisma.product.update({
            where: { id: data.productId },
            data: { stock: { increment: data.quantityChange } }
          });
        }
      }
      break;

    case 'Customer':
      if (action === 'CREATE') {
        await prisma.customer.create({ data: { ...data, id: entityId } });
      } else if (action === 'UPDATE') {
        await prisma.customer.update({ where: { id: entityId }, data });
      }
      break;

    default:
      throw new Error(`Unknown entity type: ${entityType}`);
  }
}
