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

    // Fetch sales
    const sales = await prisma.sale.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Fetch returns
    const returns = await prisma.return.findMany({
      where: {
        ...where,
        sale: storeId ? { storeId } : {},
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Fetch purchase orders
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where: {
        ...where,
        status: 'RECEIVED',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Calculate financial metrics
    const grossRevenue = sales.reduce((sum: number, sale: any) => sum + Number(sale.total), 0);
    const totalReturns = returns.reduce(
      (sum, ret) => sum + Number(ret.totalRefund),
      0
    );
    const netRevenue = grossRevenue - totalReturns;

    // Calculate Cost of Goods Sold (COGS) - simplified
    const cogs = sales.reduce((sum: number, sale: any) => {
      return (
        sum +
        sale.items.reduce((itemSum: number, item: any) => {
          // Assuming cost price is 70% of selling price (simplified)
          const costPrice = Number(item.product.price) * 0.7;
          return itemSum + costPrice * Number(item.quantity);
        }, 0)
      );
    }, 0);

    const grossProfit = netRevenue - cogs;
    const grossMargin = netRevenue > 0 ? (grossProfit / netRevenue) * 100 : 0;

    // Purchase costs
    const purchaseCosts = purchaseOrders.reduce(
      (sum: number, po: any) => {
        const poTotal = po.items.reduce(
          (itemSum: number, item: any) => itemSum + (Number(item.unitPrice) * Number(item.quantity)),
          0
        );
        return sum + poTotal;
      },
      0
    );

    // Payment method breakdown
    const paymentMethodBreakdown = sales.reduce((acc: any, sale: any) => {
      const method = sale.paymentMethod;
      if (!acc[method]) {
        acc[method] = { count: 0, total: 0 };
      }
      acc[method].count++;
      acc[method].total += Number(sale.total);
      return acc;
    }, {});

    // Daily revenue trend
    const dailyRevenue = sales.reduce((acc: any, sale: any) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { revenue: 0, transactions: 0, returns: 0 };
      }
      acc[date].revenue += Number(sale.total);
      acc[date].transactions++;
      return acc;
    }, {});

    // Add returns to daily data
    returns.forEach((ret: any) => {
      const date = ret.createdAt.toISOString().split('T')[0];
      if (dailyRevenue[date]) {
        dailyRevenue[date].returns += Number(ret.totalRefund);
      }
    });

    // Hourly sales pattern
    const hourlySales = sales.reduce((acc: any, sale: any) => {
      const hour = sale.createdAt.getHours();
      if (!acc[hour]) {
        acc[hour] = { count: 0, total: 0 };
      }
      acc[hour].count++;
      acc[hour].total += Number(sale.total);
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        grossRevenue,
        totalReturns,
        netRevenue,
        cogs,
        grossProfit,
        grossMargin,
        purchaseCosts,
        transactionCount: sales.length,
        returnCount: returns.length,
      },
      paymentMethodBreakdown,
      dailyRevenue,
      hourlySales,
      transactions: sales.map((sale: any) => ({
        id: sale.id,
        receiptNumber: sale.receiptNumber,
        date: sale.createdAt,
        total: sale.total,
        paymentMethod: sale.paymentMethod,
      })),
      returns: returns.map((ret: any) => ({
        id: ret.id,
        date: ret.createdAt,
        refundAmount: ret.totalRefund,
        reason: ret.reason,
      })),
    });
  } catch (error) {
    console.error('Error fetching financial report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch financial report' },
      { status: 500 }
    );
  }
}
