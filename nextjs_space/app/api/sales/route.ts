import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const customerId = searchParams.get('customerId');
    const storeId = searchParams.get('storeId');
    const limit = searchParams.get('limit');

    const where: any = {};

    // Filter by storeId if provided
    if (storeId) {
      where.storeId = storeId;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (customerId) {
      where.customerId = customerId;
    }

    const sales = await prisma.sale.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: true,
        store: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      customerId,
      storeId,
      items,
      subtotal,
      discountType,
      discountValue,
      discountAmount,
      total,
      paymentMethod,
      amountPaid,
      changeGiven,
    } = body;

    if (!items || items?.length === 0) {
      return NextResponse.json(
        { error: 'No items in sale' },
        { status: 400 }
      );
    }

    if (!storeId) {
      return NextResponse.json(
        { error: 'Store ID is required' },
        { status: 400 }
      );
    }

    // Generate receipt number
    const receiptNumber = `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create sale and update inventory in a transaction
    const sale = await prisma.$transaction(async (tx) => {
      // Create the sale
      const newSale = await tx.sale.create({
        data: {
          receiptNumber,
          userId: (session.user as any).id,
          storeId,
          customerId: customerId || null,
          subtotal: parseFloat(subtotal),
          discountType: discountType || null,
          discountValue: discountValue ? parseFloat(discountValue) : 0,
          discountAmount: discountAmount ? parseFloat(discountAmount) : 0,
          total: parseFloat(total),
          paymentMethod,
          amountPaid: parseFloat(amountPaid),
          changeGiven: changeGiven ? parseFloat(changeGiven) : 0,
        },
      });

      // Create sale items and update product stock
      for (const item of items) {
        await tx.saleItem.create({
          data: {
            saleId: newSale.id,
            productId: item.productId,
            quantity: parseInt(item.quantity),
            unitPrice: parseFloat(item.unitPrice),
            discount: item.discount ? parseFloat(item.discount) : 0,
            subtotal: parseFloat(item.subtotal),
          },
        });

        // Update product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: parseInt(item.quantity),
            },
          },
        });
      }

      return newSale;
    });

    // Fetch the complete sale with relations
    const completeSale = await prisma.sale.findUnique({
      where: { id: sale.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: true,
        store: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(completeSale, { status: 201 });
  } catch (error) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    );
  }
}
