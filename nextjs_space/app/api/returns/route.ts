import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const returns = await prisma.return.findMany({
      include: {
        sale: {
          include: {
            customer: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(returns);
  } catch (error) {
    console.error('Error fetching returns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch returns' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { saleId, reason, items, totalRefund } = body;

    if (!saleId || !reason || !items || items?.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify sale exists
    const sale = await prisma.sale.findUnique({
      where: { id: saleId },
    });

    if (!sale) {
      return NextResponse.json({ error: 'Sale not found' }, { status: 404 });
    }

    // Generate return number
    const returnNumber = `RET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create return and update inventory in a transaction
    const returnRecord = await prisma.$transaction(async (tx) => {
      // Create the return
      const newReturn = await tx.return.create({
        data: {
          returnNumber,
          saleId,
          reason,
          totalRefund: parseFloat(totalRefund),
        },
      });

      // Create return items and update product stock
      for (const item of items) {
        await tx.returnItem.create({
          data: {
            returnId: newReturn.id,
            productId: item.productId,
            quantity: parseInt(item.quantity),
            refundAmount: parseFloat(item.refundAmount),
          },
        });

        // Restore product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: parseInt(item.quantity),
            },
          },
        });
      }

      return newReturn;
    });

    // Fetch the complete return with relations
    const completeReturn = await prisma.return.findUnique({
      where: { id: returnRecord.id },
      include: {
        sale: {
          include: {
            customer: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(completeReturn, { status: 201 });
  } catch (error) {
    console.error('Error creating return:', error);
    return NextResponse.json(
      { error: 'Failed to create return' },
      { status: 500 }
    );
  }
}
