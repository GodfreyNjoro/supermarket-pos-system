import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const lowStock = searchParams.get('lowStock');
    const storeId = searchParams.get('storeId');

    const where: any = {};

    // Filter by storeId if provided
    if (storeId) {
      where.storeId = storeId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { barcode: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (lowStock === 'true') {
      where.stock = {
        lte: prisma.product.fields.reorderLevel,
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        store: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
    const {
      barcode,
      name,
      description,
      price,
      stock,
      reorderLevel,
      categoryId,
      storeId,
      imageUrl,
      cloud_storage_path,
      isPublic,
    } = body;

    if (!barcode || !name || !price || !categoryId || !storeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if barcode already exists in this store
    const existingProduct = await prisma.product.findFirst({
      where: {
        barcode,
        storeId,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this barcode already exists in this store' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        barcode,
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        reorderLevel: parseInt(reorderLevel) || 10,
        categoryId,
        storeId,
        imageUrl: imageUrl || null,
        cloud_storage_path: cloud_storage_path || null,
        isPublic: isPublic ?? true,
      },
      include: {
        category: true,
        store: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
