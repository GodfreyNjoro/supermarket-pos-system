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

    if (!hasPermission((session.user as any).role, 'VIEW_INVENTORY')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const storeId = searchParams.get('storeId');
    const lowStockOnly = searchParams.get('lowStockOnly') === 'true';
    const categoryId = searchParams.get('categoryId');

    const where: any = {};

    if (storeId) {
      where.storeId = storeId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Fetch products with inventory data
    const products = await prisma.product.findMany({
      where,
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
      orderBy: {
        name: 'asc',
      },
    });

    // Calculate inventory metrics
    const totalProducts = products.length;
    const totalStockValue = products.reduce(
      (sum: number, p: any) => sum + Number(p.stock) * Number(p.price),
      0
    );
    const totalStockQuantity = products.reduce(
      (sum: number, p: any) => sum + Number(p.stock),
      0
    );

    // Filter low stock items
    const lowStockItems = products.filter(
      (p: any) => Number(p.stock) <= Number(p.reorderLevel)
    );

    // Out of stock items
    const outOfStockItems = products.filter((p: any) => Number(p.stock) === 0);

    // Group by category
    const byCategory = products.reduce((acc: any, product: any) => {
      const category = product.category?.name || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          stockQuantity: 0,
          stockValue: 0,
        };
      }
      acc[category].count++;
      acc[category].stockQuantity += Number(product.stock);
      acc[category].stockValue += Number(product.stock) * Number(product.price);
      return acc;
    }, {});

    // Group by store
    const byStore = products.reduce((acc: any, product: any) => {
      const store = product.store?.name || 'Unknown';
      if (!acc[store]) {
        acc[store] = {
          count: 0,
          stockQuantity: 0,
          stockValue: 0,
        };
      }
      acc[store].count++;
      acc[store].stockQuantity += Number(product.stock);
      acc[store].stockValue += Number(product.stock) * Number(product.price);
      return acc;
    }, {});

    // Determine which products to return
    const filteredProducts = lowStockOnly ? lowStockItems : products;

    return NextResponse.json({
      summary: {
        totalProducts,
        totalStockValue,
        totalStockQuantity,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
      },
      byCategory,
      byStore,
      lowStockItems: lowStockItems.map((p: any) => ({
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        category: p.category?.name || 'Uncategorized',
        store: p.store?.name || 'Unknown',
        stock: p.stock,
        reorderLevel: p.reorderLevel,
        price: p.price,
        stockValue: Number(p.stock) * Number(p.price),
      })),
      outOfStockItems: outOfStockItems.map((p: any) => ({
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        category: p.category?.name || 'Uncategorized',
        store: p.store?.name || 'Unknown',
        reorderLevel: p.reorderLevel,
        price: p.price,
      })),
      products: filteredProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        barcode: p.barcode,
        category: p.category?.name || 'Uncategorized',
        store: p.store?.name || 'Unknown',
        stock: p.stock,
        reorderLevel: p.reorderLevel,
        price: p.price,
        stockValue: Number(p.stock) * Number(p.price),
      })),
    });
  } catch (error) {
    console.error('Error fetching inventory report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory report' },
      { status: 500 }
    );
  }
}
