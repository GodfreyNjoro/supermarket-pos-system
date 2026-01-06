import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateBarcodes() {
  try {
    console.log('🔄 Updating product barcodes to match new barcode images...\n');
    
    // New barcode mappings (from the newly generated images)
    const updates = [
      { oldBarcode: '1234567890001', newBarcode: '1234567890012', name: 'Fresh Milk' },
      { oldBarcode: '1234567890002', newBarcode: '1234567890180', name: 'White Bread' },
      { oldBarcode: '1234567890003', newBarcode: '1234567890258', name: 'Red Apples' },
      { oldBarcode: '1234567890004', newBarcode: '1234567890326', name: 'Orange Juice' },
      { oldBarcode: '1234567890005', newBarcode: '1234567890494', name: 'Pasta' },
      { oldBarcode: '1234567890006', newBarcode: '1234567890562', name: 'Chicken Breast' },
    ];
    
    for (const update of updates) {
      const product = await prisma.product.findFirst({
        where: { name: update.name }
      });
      
      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: { barcode: update.newBarcode }
        });
        console.log(`✅ ${update.name}: ${update.oldBarcode} → ${update.newBarcode}`);
      } else {
        console.log(`⚠️  ${update.name} not found in database`);
      }
    }
    
    console.log('\n✅ All barcodes updated successfully!');
    
    // Verify the changes
    console.log('\n📋 Updated product list:');
    const products = await prisma.product.findMany({
      where: {
        name: {
          in: updates.map(u => u.name)
        }
      },
      select: { name: true, barcode: true }
    });
    
    products.forEach(p => {
      console.log(`  ${p.barcode} - ${p.name}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBarcodes();
