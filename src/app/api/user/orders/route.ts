import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('customer_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: payload.id as string,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('customer_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount, shippingAddress } = body;

    if (!items || !items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // First ensure a default category exists for mock products
    let defaultCat = await prisma.category.findFirst();
    if (!defaultCat) {
      defaultCat = await prisma.category.create({
        data: { name: 'Uncategorized', slug: 'uncategorized' }
      });
    }

    // Aggregate items by productId to prevent unique constraint (orderId, productId) failure
    const aggregatedItems = items.reduce((acc: any, item: any) => {
      const existing = acc.find((i: any) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: payload.id as string,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress || 'N/A',
        status: 'PENDING',
        orderItems: {
          create: aggregatedItems.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connectOrCreate: {
                where: { id: item.productId },
                create: {
                  id: item.productId,
                  title: item.title,
                  slug: `mock-${item.productId}-${Date.now()}`,
                  description: 'Mock product generated from checkout',
                  price: item.price,
                  imageSrc: item.image,
                  categoryId: defaultCat.id
                }
              }
            }
          }))
        }
      }
    });

    return NextResponse.json({ message: 'Order created', order }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
