require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@paperly.com';
  const password = process.env.ADMIN_PASSWORD || 'password123';
  
  const passwordHash = await bcrypt.hash(password, 10);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {
      password: passwordHash,
      role: 'ADMIN',
    },
    create: {
      email,
      name: 'Paperly Admin',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Admin user seeded successfully:');
  console.log(`Email: ${adminUser.email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
