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
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};

    if (startDate && endDate) {
      where.sale = {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      };
    }

    if (storeId) {
      where.product = {
        storeId,
      };
    }

    // Fetch sale items with product details
    const saleItems = await prisma.saleItem.findMany({
      where,
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
            store: {
              select: {
                name: true,
              },
            },
          },
        },
        sale: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    // Aggregate product performance
    const productPerformance = saleItems.reduce((acc: any, item: any) => {
      const productId = item.productId;
      const product = item.product;

      if (!acc[productId]) {
        acc[productId] = {
          id: productId,
          name: product.name,
          barcode: product.barcode,
          category: product.category?.name || 'Uncategorized',
          store: product.store?.name || 'Unknown',
          price: product.price,
          currentStock: product.stock,
          quantitySold: 0,
          revenue: 0,
          transactions: 0,
        };
      }

      acc[productId].quantitySold += Number(item.quantity);
      acc[productId].revenue += Number(item.subtotal);
      acc[productId].transactions++;

      return acc;
    }, {});

    // Convert to array and sort
    const performanceArray = Object.values(productPerformance).sort(
      (a: any, b: any) => b.revenue - a.revenue
    );

    // Top sellers
    const topSellers = performanceArray.slice(0, limit);

    // Slow movers (products with low sales)
    const slowMovers = performanceArray
      .filter((p: any) => p.quantitySold > 0)
      .sort((a: any, b: any) => a.quantitySold - b.quantitySold)
      .slice(0, limit);

    // Products with no sales
    const allProducts = await prisma.product.findMany({
      where: storeId ? { storeId } : {},
      include: {
        category: {
          select: {
            name: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
    });

    const productsWithNoSales = allProducts
      .filter((p) => !productPerformance[p.id])
      .map((p) => ({
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        category: p.category?.name || 'Uncategorized',
        store: p.store?.name || 'Unknown',
        price: p.price,
        currentStock: p.stock,
      }));

    // Category performance
    const categoryPerformance = performanceArray.reduce((acc: any, item: any) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = {
          quantitySold: 0,
          revenue: 0,
          productCount: 0,
        };
      }
      acc[category].quantitySold += item.quantitySold;
      acc[category].revenue += item.revenue;
      acc[category].productCount++;
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalProductsSold: performanceArray.length,
        totalQuantitySold: performanceArray.reduce(
          (sum: number, p: any) => sum + p.quantitySold,
          0
        ),
        totalRevenue: performanceArray.reduce(
          (sum: number, p: any) => sum + p.revenue,
          0
        ),
        productsWithNoSales: productsWithNoSales.length,
      },
      topSellers,
      slowMovers,
      productsWithNoSales: productsWithNoSales.slice(0, limit),
      categoryPerformance,
      allProducts: performanceArray,
    });
  } catch (error) {
    console.error('Error fetching product performance report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product performance report' },
      { status: 500 }
    );
  }
}
