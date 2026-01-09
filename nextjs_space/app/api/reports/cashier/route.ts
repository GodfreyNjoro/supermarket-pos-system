import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission((session.user as any).role, 'VIEW_SALES')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const storeId = searchParams.get('storeId');

    const where: any = {};

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (storeId) {
      where.storeId = storeId;
    }

    // Fetch sales with user and items data
    const sales = await prisma.sale.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        items: true,
        store: {
          select: {
            name: true,
          },
        },
      },
    });

    // Aggregate cashier performance
    const cashierPerformance = sales.reduce((acc: any, sale: any) => {
      const userId = sale.userId;
      const userName = sale.user?.name || 'Unknown';

      if (!acc[userId]) {
        acc[userId] = {
          id: userId,
          name: userName,
          role: sale.user?.role || 'Unknown',
          transactionCount: 0,
          totalSales: 0,
          totalItems: 0,
          averageTransaction: 0,
          cashSales: 0,
          cardSales: 0,
        };
      }

      acc[userId].transactionCount++;
      acc[userId].totalSales += Number(sale.total);
      acc[userId].totalItems += sale.items.reduce(
        (sum: number, item: any) => sum + Number(item.quantity),
        0
      );

      if (sale.paymentMethod === 'CASH') {
        acc[userId].cashSales += Number(sale.total);
      } else {
        acc[userId].cardSales += Number(sale.total);
      }

      return acc;
    }, {});

    // Calculate averages and sort
    const performanceArray = Object.values(cashierPerformance).map((c: any) => ({
      ...c,
      averageTransaction:
        c.transactionCount > 0 ? c.totalSales / c.transactionCount : 0,
      averageItemsPerTransaction:
        c.transactionCount > 0 ? c.totalItems / c.transactionCount : 0,
    })).sort((a: any, b: any) => b.totalSales - a.totalSales);

    // Daily performance by cashier
    const dailyPerformance = sales.reduce((acc: any, sale: any) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      const userId = sale.userId;
      const userName = sale.user?.name || 'Unknown';

      if (!acc[date]) {
        acc[date] = {};
      }

      if (!acc[date][userId]) {
        acc[date][userId] = {
          name: userName,
          count: 0,
          total: 0,
        };
      }

      acc[date][userId].count++;
      acc[date][userId].total += Number(sale.total);

      return acc;
    }, {});

    // Hourly distribution
    const hourlyDistribution = sales.reduce((acc: any, sale: any) => {
      const hour = sale.createdAt.getHours();
      const userId = sale.userId;
      const userName = sale.user?.name || 'Unknown';

      if (!acc[userId]) {
        acc[userId] = {
          name: userName,
          hours: {},
        };
      }

      if (!acc[userId].hours[hour]) {
        acc[userId].hours[hour] = { count: 0, total: 0 };
      }

      acc[userId].hours[hour].count++;
      acc[userId].hours[hour].total += Number(sale.total);

      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalCashiers: performanceArray.length,
        totalTransactions: sales.length,
        totalSales: sales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0),
        averageTransactionSize:
          sales.length > 0
            ? sales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0) /
              sales.length
            : 0,
      },
      cashierPerformance: performanceArray,
      dailyPerformance,
      hourlyDistribution,
    });
  } catch (error) {
    console.error('Error fetching cashier performance report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cashier performance report' },
      { status: 500 }
    );
  }
}
