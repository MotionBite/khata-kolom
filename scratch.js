const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let defaultCat = await prisma.category.findFirst();

  let user = await prisma.user.findFirst();

  const items = [
    {
      productId: "prod-artisan-001",
      title: "The Artisan Journal",
      price: 45.00,
      quantity: 1,
      image: "test.jpg"
    },
    {
      productId: "prod-artisan-001",
      title: "The Artisan Journal (Different Variant)",
      price: 45.00,
      quantity: 2,
      image: "test.jpg"
    }
  ];

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: 135.00,
        shippingAddress: 'N/A',
        status: 'PENDING',
        orderItems: {
          create: items.map((item) => ({
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
    console.log("Success:", order);
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
}

main().finally(() => prisma.$disconnect());
