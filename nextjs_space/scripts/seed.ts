import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.stockTransferItem.deleteMany();
  await prisma.stockTransfer.deleteMany();
  await prisma.stockAdjustment.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.returnItem.deleteMany();
  await prisma.return.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.store.deleteMany();

  // Create stores
  console.log('🏪 Creating stores...');
  const stores = await Promise.all([
    prisma.store.create({
      data: {
        name: 'Downtown Store',
        address: '123 Main Street, Downtown',
        phone: '+1-555-1001',
        email: 'downtown@supermarket.com',
        isActive: true,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Westside Store',
        address: '456 West Avenue, Westside',
        phone: '+1-555-1002',
        email: 'westside@supermarket.com',
        isActive: true,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Eastside Store',
        address: '789 East Boulevard, Eastside',
        phone: '+1-555-1003',
        email: 'eastside@supermarket.com',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${stores.length} stores`);

  // Create suppliers
  console.log('🚚 Creating suppliers...');
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        code: 'SUP001',
        name: 'Fresh Farms Dairy',
        contactPerson: 'Mike Johnson',
        email: 'mike@freshfarms.com',
        phone: '+1-555-2001',
        address: '100 Farm Road',
        city: 'Springfield',
        paymentTerms: 'Net 30',
        leadTimeDays: 3,
      },
    }),
    prisma.supplier.create({
      data: {
        code: 'SUP002',
        name: 'Golden Harvest Bakery',
        contactPerson: 'Sarah Baker',
        email: 'sarah@goldenharvest.com',
        phone: '+1-555-2002',
        address: '200 Baker Street',
        city: 'Springfield',
        paymentTerms: 'Net 15',
        leadTimeDays: 1,
      },
    }),
    prisma.supplier.create({
      data: {
        code: 'SUP003',
        name: 'Valley Fresh Produce',
        contactPerson: 'Tom Green',
        email: 'tom@valleyfresh.com',
        phone: '+1-555-2003',
        address: '300 Valley Lane',
        city: 'Riverdale',
        paymentTerms: 'Net 7',
        leadTimeDays: 2,
      },
    }),
    prisma.supplier.create({
      data: {
        code: 'SUP004',
        name: 'Premium Meats Co.',
        contactPerson: 'Bob Carter',
        email: 'bob@premiummeats.com',
        phone: '+1-555-2004',
        address: '400 Industrial Park',
        city: 'Westfield',
        paymentTerms: 'Net 30',
        leadTimeDays: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${suppliers.length} suppliers`);

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword1 = await bcrypt.hash('johndoe123', 10);
  const hashedPassword2 = await bcrypt.hash('admin123', 10);
  const hashedPassword3 = await bcrypt.hash('cashier123', 10);
  const hashedPassword4 = await bcrypt.hash('cashier2', 10);
  const hashedPassword5 = await bcrypt.hash('cashier3', 10);
  const hashedPassword6 = await bcrypt.hash('manager123', 10);
  const hashedPassword7 = await bcrypt.hash('inventory123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword1,
      role: 'ADMIN',
      storeId: null, // Admin has access to all stores
    },
  });

  const adminUser2 = await prisma.user.create({
    data: {
      email: 'admin@pos.com',
      name: 'Admin User',
      password: hashedPassword2,
      role: 'ADMIN',
      storeId: null, // Admin has access to all stores
    },
  });

  const cashierUser = await prisma.user.create({
    data: {
      email: 'cashier@pos.com',
      name: 'Cashier User',
      password: hashedPassword3,
      role: 'CASHIER',
      storeId: stores[0].id, // Assigned to Downtown Store
    },
  });

  const cashierUser2 = await prisma.user.create({
    data: {
      email: 'cashier2@pos.com',
      name: 'West Cashier',
      password: hashedPassword4,
      role: 'CASHIER',
      storeId: stores[1].id, // Assigned to Westside Store
    },
  });

  const cashierUser3 = await prisma.user.create({
    data: {
      email: 'cashier3@pos.com',
      name: 'East Cashier',
      password: hashedPassword5,
      role: 'CASHIER',
      storeId: stores[2].id, // Assigned to Eastside Store
    },
  });

  // Create Manager
  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@pos.com',
      name: 'Store Manager',
      password: hashedPassword6,
      role: 'MANAGER',
      storeId: stores[0].id,
    },
  });

  // Create Inventory Clerk
  const inventoryUser = await prisma.user.create({
    data: {
      email: 'inventory@pos.com',
      name: 'Inventory Clerk',
      password: hashedPassword7,
      role: 'INVENTORY_CLERK',
      storeId: stores[0].id,
    },
  });

  console.log(`✅ Created 7 users`);

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

  // Create products with images - distributed across all stores
  console.log('🛒 Creating products...');
  
  // Base product templates
  const productTemplates = [
    {
      barcode: '1234567890001',
      name: 'Fresh Milk',
      description: 'Whole milk, 1 gallon',
      price: 4.99,
      reorderLevel: 10,
      categoryId: categories[0].id, // Dairy & Eggs
      imageUrl: 'https://cdn.abacus.ai/images/1150c1c1-36c7-4a47-b262-30ae057e9149.png',
    },
    {
      barcode: '1234567890002',
      name: 'White Bread',
      description: 'Fresh baked white bread loaf',
      price: 2.49,
      reorderLevel: 5,
      categoryId: categories[1].id, // Bakery
      imageUrl: 'https://cdn.abacus.ai/images/7558520b-df14-44bb-a9a6-1f04875463c8.png',
    },
    {
      barcode: '1234567890003',
      name: 'Red Apples',
      description: 'Fresh red apples, per lb',
      price: 1.99,
      reorderLevel: 20,
      categoryId: categories[2].id, // Fresh Produce
      imageUrl: 'https://cdn.abacus.ai/images/01ee53a9-07f3-4080-9621-b7d205723e49.png',
    },
    {
      barcode: '1234567890004',
      name: 'Orange Juice',
      description: '100% pure orange juice, 1L',
      price: 5.99,
      reorderLevel: 8,
      categoryId: categories[3].id, // Beverages
      imageUrl: 'https://cdn.abacus.ai/images/8e3b71fe-7d24-40d0-bb9c-9b7984bc628d.png',
    },
    {
      barcode: '1234567890005',
      name: 'Pasta',
      description: 'Premium pasta, 500g',
      price: 1.79,
      reorderLevel: 15,
      categoryId: categories[4].id, // Pantry & Dry Goods
      imageUrl: 'https://cdn.abacus.ai/images/c28c8152-eb05-4faa-a721-25ca5ed88755.png',
    },
    {
      barcode: '1234567890006',
      name: 'Chicken Breast',
      description: 'Fresh chicken breast, per lb',
      price: 6.99,
      reorderLevel: 8,
      categoryId: categories[5].id, // Meat & Poultry
      imageUrl: 'https://cdn.abacus.ai/images/1445dd76-56d9-4841-9057-95b6a90bf2bd.png',
    },
    {
      barcode: '1234567890007',
      name: 'Fresh Tomatoes',
      description: 'Ripe tomatoes, per lb',
      price: 2.29,
      reorderLevel: 15,
      categoryId: categories[2].id, // Fresh Produce
      imageUrl: 'https://cdn.abacus.ai/images/8ca52a3a-7a9c-4336-bec2-f2856e26b7d5.png',
    },
    {
      barcode: '1234567890008',
      name: 'White Rice',
      description: 'Long grain white rice, 5lb bag',
      price: 8.99,
      reorderLevel: 10,
      categoryId: categories[4].id, // Pantry & Dry Goods
      imageUrl: 'https://cdn.abacus.ai/images/9e19f4e4-397c-47f5-963d-f61bfef6d5f2.png',
    },
    {
      barcode: '1234567890009',
      name: 'Chocolate Bar',
      description: 'Premium milk chocolate bar',
      price: 1.49,
      reorderLevel: 30,
      categoryId: categories[6].id, // Snacks & Candy
      imageUrl: 'https://cdn.abacus.ai/images/ecd55113-ba01-41ef-83c7-4b8070431d5c.png',
    },
    {
      barcode: '1234567890010',
      name: 'Shampoo',
      description: 'Nourishing shampoo, 400ml',
      price: 7.99,
      reorderLevel: 10,
      categoryId: categories[7].id, // Personal Care
      imageUrl: 'https://cdn.abacus.ai/images/ae2b7b34-209f-448a-b38f-d59a757aa280.png',
    },
    {
      barcode: '1234567890011',
      name: 'Laundry Detergent',
      description: 'Fresh scent laundry detergent, 2L',
      price: 12.99,
      reorderLevel: 8,
      categoryId: categories[8].id, // Household & Cleaning
      imageUrl: 'https://cdn.abacus.ai/images/043e022c-7351-40e5-b54a-0a00c88aa7f2.png',
    },
    {
      barcode: '1234567890012',
      name: 'Fresh Eggs',
      description: 'Farm fresh eggs, dozen',
      price: 3.99,
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
      reorderLevel: 30,
      categoryId: categories[2].id,
      imageUrl: null,
    },
    {
      barcode: '1234567890014',
      name: 'Cheddar Cheese',
      description: 'Aged cheddar cheese, 8oz',
      price: 4.99,
      reorderLevel: 10,
      categoryId: categories[0].id,
      imageUrl: null,
    },
    {
      barcode: '1234567890015',
      name: 'Potato Chips',
      description: 'Classic salted chips, large bag',
      price: 3.49,
      reorderLevel: 20,
      categoryId: categories[6].id,
      imageUrl: null,
    },
  ];

  // Create products for each store with varying stock levels
  let productCount = 0;
  const stockVariations = [
    { multiplier: 1.0, offset: 0 },    // Downtown Store - baseline
    { multiplier: 0.8, offset: -5 },   // Westside Store - slightly lower stock
    { multiplier: 1.2, offset: 10 },   // Eastside Store - higher stock
  ];

  for (const [storeIndex, store] of stores.entries()) {
    for (const template of productTemplates) {
      const variation = stockVariations[storeIndex];
      const baseStock = 50; // Default stock level
      const adjustedStock = Math.max(10, Math.floor(baseStock * variation.multiplier) + variation.offset);
      
      await prisma.product.create({
        data: {
          ...template,
          stock: adjustedStock,
          storeId: store.id,
        },
      });
      productCount++;
    }
  }

  console.log(`✅ Created ${productCount} products across ${stores.length} stores`);

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

  // Get products for creating sample data
  const downtownProducts = await prisma.product.findMany({ where: { storeId: stores[0].id }, take: 10 });

  // Create sample sales
  console.log('💰 Creating sample sales...');
  const sampleSales = [];
  for (let i = 0; i < 15; i++) {
    const saleProducts = downtownProducts.slice(0, Math.floor(Math.random() * 4) + 1);
    const items = saleProducts.map((p: any) => ({
      productId: p.id,
      quantity: Math.floor(Math.random() * 3) + 1,
      unitPrice: p.price,
      subtotal: p.price * (Math.floor(Math.random() * 3) + 1)
    }));
    const subtotal = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    const total = subtotal;
    
    const sale = await prisma.sale.create({
      data: {
        receiptNumber: `RCP-${Date.now()}-${i}`,
        userId: cashierUser.id,
        storeId: stores[0].id,
        customerId: customers[i % customers.length].id,
        subtotal,
        total,
        paymentMethod: i % 2 === 0 ? 'CASH' : 'CARD',
        amountPaid: Math.ceil(total),
        changeGiven: Math.ceil(total) - total,
        createdAt: new Date(Date.now() - i * 86400000), // Spread over past days
        items: { create: items }
      }
    });
    sampleSales.push(sale);
  }
  console.log(`✅ Created ${sampleSales.length} sample sales`);

  // Create purchase orders
  console.log('📦 Creating purchase orders...');
  const purchaseOrders = [];
  for (let i = 0; i < 5; i++) {
    const supplier = suppliers[i % suppliers.length];
    const orderProducts = downtownProducts.slice(i * 2, i * 2 + 3);
    const items = orderProducts.map((p: any) => ({
      productId: p.id,
      orderedQuantity: 50 + i * 10,
      receivedQuantity: i < 3 ? 50 + i * 10 : 0,
      unitCost: p.price * 0.6,
      total: (50 + i * 10) * p.price * 0.6
    }));
    const subtotal = items.reduce((sum: number, item: any) => sum + item.total, 0);

    const po = await prisma.purchaseOrder.create({
      data: {
        orderNumber: `PO-${Date.now()}-${i}`,
        supplierId: supplier.id,
        storeId: stores[0].id,
        createdById: adminUser.id,
        status: i < 2 ? 'RECEIVED' : i < 4 ? 'SENT' : 'DRAFT',
        subtotal,
        total: subtotal,
        expectedDate: new Date(Date.now() + 7 * 86400000),
        receivedDate: i < 2 ? new Date() : null,
        items: { create: items }
      }
    });
    purchaseOrders.push(po);
  }
  console.log(`✅ Created ${purchaseOrders.length} purchase orders`);

  // Create stock adjustments
  console.log('📝 Creating stock adjustments...');
  const adjustmentTypes: ('CORRECTION' | 'DAMAGED' | 'EXPIRED' | 'RETURNED')[] = ['CORRECTION', 'DAMAGED', 'EXPIRED', 'RETURNED'];
  for (let i = 0; i < 10; i++) {
    const product = downtownProducts[i % downtownProducts.length];
    const type = adjustmentTypes[i % adjustmentTypes.length];
    const change = type === 'RETURNED' ? 5 : -(Math.floor(Math.random() * 5) + 1);
    
    await prisma.stockAdjustment.create({
      data: {
        referenceNumber: `ADJ-${Date.now()}-${i}`,
        productId: product.id,
        storeId: stores[0].id,
        userId: inventoryUser.id,
        type: type,
        quantityBefore: product.stock,
        quantityChange: change,
        quantityAfter: product.stock + change,
        reason: `${type.toLowerCase()} - demo data`,
        createdAt: new Date(Date.now() - i * 86400000)
      }
    });
  }
  console.log(`✅ Created 10 stock adjustments`);

  // Create stock transfers
  console.log('🔄 Creating stock transfers...');
  for (let i = 0; i < 3; i++) {
    const transferProducts = downtownProducts.slice(i * 2, i * 2 + 2);
    await prisma.stockTransfer.create({
      data: {
        transferNumber: `TRF-${Date.now()}-${i}`,
        fromStoreId: stores[0].id,
        toStoreId: stores[1].id,
        createdById: managerUser.id,
        status: i === 0 ? 'COMPLETED' : 'PENDING',
        completedAt: i === 0 ? new Date() : null,
        items: {
          create: transferProducts.map((p: any) => ({
            barcode: p.barcode,
            productName: p.name,
            quantity: 10 + i * 5
          }))
        }
      }
    });
  }
  console.log(`✅ Created 3 stock transfers`);

  // Create returns
  console.log('↩️ Creating sample returns...');
  if (sampleSales.length > 0) {
    const saleForReturn = await prisma.sale.findFirst({
      where: { id: sampleSales[0].id },
      include: { items: true }
    });
    if (saleForReturn && saleForReturn.items.length > 0) {
      await prisma.return.create({
        data: {
          returnNumber: `RTN-${Date.now()}`,
          saleId: saleForReturn.id,
          reason: 'Product defective - demo data',
          totalRefund: saleForReturn.items[0].subtotal,
          items: {
            create: [{
              productId: saleForReturn.items[0].productId,
              quantity: 1,
              refundAmount: saleForReturn.items[0].subtotal
            }]
          }
        }
      });
    }
  }
  console.log(`✅ Created sample returns`);

  console.log('✨ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Stores: ${stores.length}`);
  console.log(`   Suppliers: ${suppliers.length}`);
  console.log(`   Users: 7 (Admin, Manager, Inventory Clerk, Cashiers)`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${productCount}`);
  console.log(`   Customers: ${customers.length}`);
  console.log(`   Sales: ${sampleSales.length}`);
  console.log(`   Purchase Orders: ${purchaseOrders.length}`);
  console.log(`   Stock Adjustments: 10`);
  console.log(`   Stock Transfers: 3`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
