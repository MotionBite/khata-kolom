import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  originalPrice: z.number().optional(),
  stockCount: z.number().min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Category is required'),
  imageSrc: z.string().optional().or(z.literal('')),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const stockStatus = searchParams.get('stockStatus') || '';
    
    // Simple pagination mock (can be extended)
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {
      ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
      ...(categoryId ? { categoryId } : {}),
    };
    
    if (stockStatus === 'in-stock') {
      where.stockCount = { gt: 0 };
    } else if (stockStatus === 'out-of-stock') {
      where.stockCount = { equals: 0 };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const total = await prisma.product.count({ where });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Failed to fetch products', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { title, subtitle, description, price, originalPrice, stockCount, categoryId, imageSrc } = result.data;
    
    // Auto-generate slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Check if slug exists
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description,
        price,
        originalPrice: originalPrice || null,
        stockCount,
        categoryId,
        imageSrc: imageSrc || null,
      },
      include: { category: true }
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
