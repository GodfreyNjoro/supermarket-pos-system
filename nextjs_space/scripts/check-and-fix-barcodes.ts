import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndFixBarcodes() {
  try {
    console.log('Checking products...');
    
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        barcode: true,
      }
    });
    
    console.log(`Found ${products.length} products`);
    
    // Show current state
    products.forEach((product: any) => {
      console.log(`- ${product.name}: ${product.barcode || 'NO BARCODE'}`);
    });
    
    // Check if any product is missing barcode or has invalid barcode
    const productsNeedingFix = products.filter((p: any) => 
      !p.barcode || p.barcode.length < 10
    );
    
    if (productsNeedingFix.length === 0) {
      console.log('\n✅ All products have valid barcodes!');
      return;
    }
    
    console.log(`\n⚠️  Found ${productsNeedingFix.length} products needing barcodes`);
    console.log('Fixing barcodes...\n');
    
    // Define the correct barcode mappings
    const barcodeMap: Record<string, string> = {
      'Fresh Milk': '1234567890001',
      'White Bread': '1234567890002',
      'Red Apples': '1234567890003',
      'Orange Juice': '1234567890004',
      'Pasta': '1234567890005',
      'Chicken Breast': '1234567890006',
      'Fresh Tomatoes': '1234567890007',
      'White Rice': '1234567890008',
      'Chocolate Bar': '1234567890009',
      'Shampoo': '1234567890010',
      'Laundry Detergent': '1234567890011',
      'Eggs': '1234567890012',
    };
    
    // Update each product with the correct barcode
    for (const product of products) {
      const correctBarcode = barcodeMap[product.name];
      
      if (correctBarcode && product.barcode !== correctBarcode) {
        await prisma.product.update({
          where: { id: product.id },
          data: { barcode: correctBarcode }
        });
        console.log(`✓ Updated ${product.name}: ${correctBarcode}`);
      }
    }
    
    console.log('\n✅ All barcodes fixed!');
    
    // Show final state
    console.log('\nFinal product list:');
    const updatedProducts = await prisma.product.findMany({
      select: { name: true, barcode: true }
    });
    
    updatedProducts.forEach((p: any) => {
      console.log(`  ${p.barcode} - ${p.name}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndFixBarcodes();
