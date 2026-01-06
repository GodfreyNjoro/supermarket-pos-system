import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.returnItem.deleteMany();
  await prisma.return.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword1 = await bcrypt.hash('johndoe123', 10);
  const hashedPassword2 = await bcrypt.hash('admin123', 10);
  const hashedPassword3 = await bcrypt.hash('cashier123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword1,
      role: 'ADMIN',
    },
  });

  const adminUser2 = await prisma.user.create({
    data: {
      email: 'admin@pos.com',
      name: 'Admin User',
      password: hashedPassword2,
      role: 'ADMIN',
    },
  });

  const cashierUser = await prisma.user.create({
    data: {
      email: 'cashier@pos.com',
      name: 'Cashier User',
      password: hashedPassword3,
      role: 'CASHIER',
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create categories
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Dairy & Eggs' } }),
    prisma.category.create({ data: { name: 'Bakery' } }),
    prisma.category.create({ data: { name: 'Fresh Produce' } }),
    prisma.category.create({ data: { name: 'Beverages' } }),
    prisma.category.create({ data: { name: 'Pantry & Dry Goods' } }),
    prisma.category.create({ data: { name: 'Meat & Poultry' } }),
    prisma.category.create({ data: { name: 'Snacks & Candy' } }),
    prisma.category.create({ data: { name: 'Personal Care' } }),
    prisma.category.create({ data: { name: 'Household & Cleaning' } }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create products with images
  console.log('🛒 Creating products...');
  
  const productsData = [
    {
      barcode: '1234567890001',
      name: 'Fresh Milk',
      description: 'Whole milk, 1 gallon',
      price: 4.99,
      stock: 50,
      reorderLevel: 10,
      categoryId: categories[0].id, // Dairy & Eggs
      imageUrl: 'https://cdn.abacus.ai/images/1150c1c1-36c7-4a47-b262-30ae057e9149.png',
    },
    {
      barcode: '1234567890002',
      name: 'White Bread',
      description: 'Fresh baked white bread loaf',
      price: 2.49,
      stock: 30,
      reorderLevel: 5,
      categoryId: categories[1].id, // Bakery
      imageUrl: 'https://cdn.abacus.ai/images/7558520b-df14-44bb-a9a6-1f04875463c8.png',
    },
    {
      barcode: '1234567890003',
      name: 'Red Apples',
      description: 'Fresh red apples, per lb',
      price: 1.99,
      stock: 100,
      reorderLevel: 20,
      categoryId: categories[2].id, // Fresh Produce
      imageUrl: 'https://cdn.abacus.ai/images/01ee53a9-07f3-4080-9621-b7d205723e49.png',
    },
    {
      barcode: '1234567890004',
      name: 'Orange Juice',
      description: '100% pure orange juice, 1L',
      price: 5.99,
      stock: 40,
      reorderLevel: 8,
      categoryId: categories[3].id, // Beverages
      imageUrl: 'https://cdn.abacus.ai/images/8e3b71fe-7d24-40d0-bb9c-9b7984bc628d.png',
    },
    {
      barcode: '1234567890005',
      name: 'Pasta',
      description: 'Premium pasta, 500g',
      price: 1.79,
      stock: 60,
      reorderLevel: 15,
      categoryId: categories[4].id, // Pantry & Dry Goods
      imageUrl: 'https://cdn.abacus.ai/images/c28c8152-eb05-4faa-a721-25ca5ed88755.png',
    },
    {
      barcode: '1234567890006',
      name: 'Chicken Breast',
      description: 'Fresh chicken breast, per lb',
      price: 6.99,
      stock: 25,
      reorderLevel: 8,
      categoryId: categories[5].id, // Meat & Poultry
      imageUrl: 'https://cdn.abacus.ai/images/1445dd76-56d9-4841-9057-95b6a90bf2bd.png',
    },
    {
      barcode: '1234567890007',
      name: 'Fresh Tomatoes',
      description: 'Ripe tomatoes, per lb',
      price: 2.29,
      stock: 80,
      reorderLevel: 15,
      categoryId: categories[2].id, // Fresh Produce
      imageUrl: 'https://cdn.abacus.ai/images/8ca52a3a-7a9c-4336-bec2-f2856e26b7d5.png',
    },
    {
      barcode: '1234567890008',
      name: 'White Rice',
      description: 'Long grain white rice, 5lb bag',
      price: 8.99,
      stock: 35,
      reorderLevel: 10,
      categoryId: categories[4].id, // Pantry & Dry Goods
      imageUrl: 'https://cdn.abacus.ai/images/9e19f4e4-397c-47f5-963d-f61bfef6d5f2.png',
    },
    {
      barcode: '1234567890009',
      name: 'Chocolate Bar',
      description: 'Premium milk chocolate bar',
      price: 1.49,
      stock: 150,
      reorderLevel: 30,
      categoryId: categories[6].id, // Snacks & Candy
      imageUrl: 'https://cdn.abacus.ai/images/ecd55113-ba01-41ef-83c7-4b8070431d5c.png',
    },
    {
      barcode: '1234567890010',
      name: 'Shampoo',
      description: 'Nourishing shampoo, 400ml',
      price: 7.99,
      stock: 45,
      reorderLevel: 10,
      categoryId: categories[7].id, // Personal Care
      imageUrl: 'https://cdn.abacus.ai/images/ae2b7b34-209f-448a-b38f-d59a757aa280.png',
    },
    {
      barcode: '1234567890011',
      name: 'Laundry Detergent',
      description: 'Fresh scent laundry detergent, 2L',
      price: 12.99,
      stock: 30,
      reorderLevel: 8,
      categoryId: categories[8].id, // Household & Cleaning
      imageUrl: 'https://cdn.abacus.ai/images/043e022c-7351-40e5-b54a-0a00c88aa7f2.png',
    },
    {
      barcode: '1234567890012',
      name: 'Fresh Eggs',
      description: 'Farm fresh eggs, dozen',
      price: 3.99,
      stock: 60,
      reorderLevel: 12,
      categoryId: categories[0].id, // Dairy & Eggs
      imageUrl: 'https://cdn.abacus.ai/images/758d330f-7cc1-415d-a07c-dd8eb9b0458d.png',
    },
    // Additional products without images for variety
    {
      barcode: '1234567890013',
      name: 'Bananas',
      description: 'Fresh bananas, per lb',
      price: 0.69,
      stock: 120,
      reorderLevel: 30,
      categoryId: categories[2].id,
      imageUrl: null,
    },
    {
      barcode: '1234567890014',
      name: 'Cheddar Cheese',
      description: 'Aged cheddar cheese, 8oz',
      price: 4.99,
      stock: 40,
      reorderLevel: 10,
      categoryId: categories[0].id,
      imageUrl: null,
    },
    {
      barcode: '1234567890015',
      name: 'Potato Chips',
      description: 'Classic salted chips, large bag',
      price: 3.49,
      stock: 80,
      reorderLevel: 20,
      categoryId: categories[6].id,
      imageUrl: null,
    },
  ];

  for (const productData of productsData) {
    await prisma.product.create({ data: productData });
  }

  console.log(`✅ Created ${productsData.length} products`);

  // Create sample customers
  console.log('👨‍👩‍👧‍👦 Creating customers...');
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Sarah Johnson',
        phone: '+1-555-0101',
        email: 'sarah.j@email.com',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Michael Brown',
        phone: '+1-555-0102',
        email: 'michael.b@email.com',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Emily Davis',
        phone: '+1-555-0103',
        email: 'emily.d@email.com',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'James Wilson',
        phone: '+1-555-0104',
        email: null,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Lisa Anderson',
        phone: '+1-555-0105',
        email: 'lisa.a@email.com',
      },
    }),
  ]);

  console.log(`✅ Created ${customers.length} customers`);

  console.log('✨ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Users: 3 (2 Admin, 1 Cashier)`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${productsData.length}`);
  console.log(`   Customers: ${customers.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
