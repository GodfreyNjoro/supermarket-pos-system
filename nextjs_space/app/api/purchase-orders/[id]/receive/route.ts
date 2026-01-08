import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { hasPermission } from '@/lib/permissions';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!hasPermission((session.user as { role: string; id: string }).role, 'RECEIVE_ORDERS')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const data = await request.json();
    const receivedItems: { itemId: string; quantity: number }[] = data.items; // [{ itemId, quantity }]

    const order = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { items: { include: { product: true } } }
    });

    if (!order || !['SENT', 'PARTIAL'].includes(order.status)) {
      return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
    }

    // Process received items
    for (const received of receivedItems) {
      const item = order.items.find((i: typeof order.items[0]) => i.id === received.itemId);
      if (!item) continue;

      const newReceived = item.receivedQuantity + received.quantity;
      
      // Update item received quantity
      await prisma.purchaseOrderItem.update({
        where: { id: item.id },
        data: { receivedQuantity: newReceived }
      });

      // Update product stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: received.quantity } }
      });

      // Create stock adjustment
      await prisma.stockAdjustment.create({
        data: {
          referenceNumber: `RCV-${order.orderNumber}-${Date.now()}`,
          productId: item.productId,
          storeId: order.storeId,
          userId: (session.user as { role: string; id: string }).id,
          type: 'RECEIVED',
          quantityBefore: item.product.stock,
          quantityChange: received.quantity,
          quantityAfter: item.product.stock + received.quantity,
          reason: `Received from PO: ${order.orderNumber}`
        }
      });
    }

    // Check if fully received
    const updatedOrder = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { items: true }
    });

    const allReceived = updatedOrder?.items.every(i => i.receivedQuantity >= i.orderedQuantity);
    const someReceived = updatedOrder?.items.some(i => i.receivedQuantity > 0);

    const newStatus = allReceived ? 'RECEIVED' : someReceived ? 'PARTIAL' : 'SENT';

    const finalOrder = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        status: newStatus,
        receivedById: (session.user as { role: string; id: string }).id,
        receivedDate: allReceived ? new Date() : null
      },
      include: { items: true }
    });

    return NextResponse.json(finalOrder);
  } catch (error) {
    console.error('Error receiving order:', error);
    return NextResponse.json({ error: 'Failed to receive order' }, { status: 500 });
  }
}
