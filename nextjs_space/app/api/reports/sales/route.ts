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
    const groupBy = searchParams.get('groupBy') || 'day'; // day, week, month

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

    // Fetch detailed sales data
    const sales = await prisma.sale.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            role: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate summary statistics
    const totalRevenue = sales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0);
    const totalTransactions = sales.length;
    const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Group by payment method
    const byPaymentMethod = sales.reduce((acc: any, sale: any) => {
      const method = sale.paymentMethod;
      if (!acc[method]) {
        acc[method] = { count: 0, total: 0 };
      }
      acc[method].count++;
      acc[method].total += Number(sale.total);
      return acc;
    }, {});

    // Group by cashier
    const byCashier = sales.reduce((acc: any, sale: any) => {
      const cashier = sale.user?.name || 'Unknown';
      if (!acc[cashier]) {
        acc[cashier] = { count: 0, total: 0 };
      }
      acc[cashier].count++;
      acc[cashier].total += Number(sale.total);
      return acc;
    }, {});

    // Group by store
    const byStore = sales.reduce((acc: any, sale: any) => {
      const store = sale.store?.name || 'Unknown';
      if (!acc[store]) {
        acc[store] = { count: 0, total: 0 };
      }
      acc[store].count++;
      acc[store].total += Number(sale.total);
      return acc;
    }, {});

    // Group by time period
    const byTimePeriod = sales.reduce((acc: any, sale: any) => {
      const date = new Date(sale.createdAt);
      let key: string;

      if (groupBy === 'day') {
        key = date.toISOString().split('T')[0];
      } else if (groupBy === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      if (!acc[key]) {
        acc[key] = { count: 0, total: 0 };
      }
      acc[key].count++;
      acc[key].total += Number(sale.total);
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalRevenue,
        totalTransactions,
        averageTransaction,
      },
      byPaymentMethod,
      byCashier,
      byStore,
      byTimePeriod,
      transactions: sales.map((sale) => ({
        id: sale.id,
        receiptNumber: sale.receiptNumber,
        date: sale.createdAt,
        total: sale.total,
        paymentMethod: sale.paymentMethod,
        cashier: sale.user?.name || 'Unknown',
        store: sale.store?.name || 'Unknown',
        itemsCount: sale.items.length,
      })),
    });
  } catch (error) {
    console.error('Error fetching sales report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales report' },
      { status: 500 }
    );
  }
}
