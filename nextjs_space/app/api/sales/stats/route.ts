import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';

    let startDate: Date;
    const endDate = new Date();

    switch (period) {
      case 'today':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
    }

    // Total sales
    const totalSales = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        total: true,
      },
      _count: true,
    });

    // Sales by day
    const salesByDay = await prisma.$queryRaw<
      Array<{ date: string; total: number; count: bigint }>
    >`
      SELECT 
        DATE("createdAt") as date,
        SUM(total) as total,
        COUNT(*) as count
      FROM "Sale"
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${endDate}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `;

    // Convert BigInt to number for JSON serialization
    const formattedSalesByDay = salesByDay?.map?.((item) => ({
      date: item?.date,
      total: item?.total,
      count: Number(item?.count),
    })) ?? [];

    // Top selling products
    const topProducts = await prisma.saleItem.groupBy({
      by: ['productId'],
      where: {
        sale: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      _sum: {
        quantity: true,
        subtotal: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 10,
    });

    // Fetch product details
    const topProductsWithDetails = await Promise.all(
      topProducts?.map?.(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item?.productId },
          include: { category: true },
        });
        return {
          product,
          quantity: item?._sum?.quantity,
          revenue: item?._sum?.subtotal,
        };
      }) ?? []
    );

    // Low stock products
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: prisma.product.fields.reorderLevel,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        stock: 'asc',
      },
      take: 10,
    });

    // Sales by payment method
    const salesByPaymentMethod = await prisma.sale.groupBy({
      by: ['paymentMethod'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        total: true,
      },
      _count: true,
    });

    return NextResponse.json({
      totalSales: totalSales?._sum?.total ?? 0,
      totalTransactions: totalSales?._count ?? 0,
      salesByDay: formattedSalesByDay,
      topProducts: topProductsWithDetails,
      lowStockProducts,
      salesByPaymentMethod,
    });
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales stats' },
      { status: 500 }
    );
  }
}
