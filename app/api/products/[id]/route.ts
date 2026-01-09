import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { deleteFile } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      imageUrl,
      cloud_storage_path,
      isPublic,
    } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // If barcode is being changed, check if new barcode already exists in the same store
    if (barcode && barcode !== existingProduct.barcode) {
      const barcodeExists = await prisma.product.findFirst({
        where: {
          barcode,
          storeId: existingProduct.storeId,
          id: { not: params.id },
        },
      });

      if (barcodeExists) {
        return NextResponse.json(
          { error: 'Product with this barcode already exists in this store' },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        barcode: barcode || existingProduct.barcode,
        name: name || existingProduct.name,
        description: description !== undefined ? description : existingProduct.description,
        price: price ? parseFloat(price) : existingProduct.price,
        stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
        reorderLevel: reorderLevel !== undefined ? parseInt(reorderLevel) : existingProduct.reorderLevel,
        categoryId: categoryId || existingProduct.categoryId,
        imageUrl: imageUrl !== undefined ? imageUrl : existingProduct.imageUrl,
        cloud_storage_path: cloud_storage_path !== undefined ? cloud_storage_path : existingProduct.cloud_storage_path,
        isPublic: isPublic !== undefined ? isPublic : existingProduct.isPublic,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete image from S3 if exists
    if (product.cloud_storage_path) {
      try {
        await deleteFile(product.cloud_storage_path);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
