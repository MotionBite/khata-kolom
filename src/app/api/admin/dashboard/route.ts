import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Total Revenue (sum of all completed orders, or all orders for now)
    const orders = await prisma.order.findMany({
      select: { totalAmount: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
    const totalOrders = orders.length;

    // 2. Active Customers (count of all users with role 'CUSTOMER')
    const activeCustomers = await prisma.user.count({
      where: { role: 'CUSTOMER' }
    });

    // 3. Total Products (count of all products)
    const totalProducts = await prisma.product.count();

    // 4. Recent Orders
    const recentOrdersRaw = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        user: { select: { name: true } }
      }
    });

    const recentOrders = recentOrdersRaw.map(order => ({
      id: order.id.slice(0, 8).toUpperCase(), // Short ID
      customer: order.user?.name || 'Unknown',
      date: order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: `৳${Number(order.totalAmount).toLocaleString()}`,
      status: order.status
    }));

    // 5. Low Stock Alerts
    const lowStockRaw = await prisma.product.findMany({
      orderBy: { stockCount: 'asc' },
      take: 3,
      select: { title: true, stockCount: true }
    });

    const lowStock = lowStockRaw.map(p => ({
      item: p.title,
      stock: p.stockCount
    }));

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        activeCustomers,
        totalProducts
      },
      recentOrders,
      lowStock
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
