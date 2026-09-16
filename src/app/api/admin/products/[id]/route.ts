import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateProductSchema = z.object({
  title: z.string().min(3, 'Title is required').optional(),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'Description is required').optional(),
  price: z.number().min(0, 'Price must be positive').optional(),
  originalPrice: z.number().optional(),
  stockCount: z.number().min(0, 'Stock cannot be negative').optional(),
  categoryId: z.string().min(1, 'Category is required').optional(),
  imageSrc: z.string().optional().or(z.literal('')),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = { ...result.data };

    // Update slug if title changes
    if (updateData.title) {
      let slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await prisma.product.findFirst({
        where: { slug, id: { not: id } }
      });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Failed to update product', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Check for existing order items (cascade strategy could be implemented here)
    const existingOrderItems = await prisma.orderItem.findFirst({
      where: { productId: id }
    });

    if (existingOrderItems) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing orders. Consider archiving instead.' }, 
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
