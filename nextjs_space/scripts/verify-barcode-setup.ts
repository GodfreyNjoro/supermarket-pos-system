import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyBarcodeSetup() {
  try {
    console.log('🔍 BARCODE VERIFICATION REPORT\n');
    console.log('=' .repeat(60));
    
    // Get all products with barcodes
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        barcode: true,
        price: true,
        stock: true,
      },
      orderBy: {
        barcode: 'asc'
      }
    });
    
    console.log(`\n✅ Total Products: ${products.length}\n`);
    
    // Barcodes we generated images for
    const generatedBarcodes = [
      '1234567890001',
      '1234567890002',
      '1234567890003',
      '1234567890004',
      '1234567890005',
      '1234567890006',
    ];
    
    console.log('📊 PRODUCTS WITH GENERATED BARCODES:\n');
    console.log('Barcode          | Product Name         | Price   | Stock');
    console.log('-'.repeat(60));
    
    generatedBarcodes.forEach((barcode: string) => {
      const product = products.find((p: any) => p.barcode === barcode);
      if (product) {
        const name = product.name.padEnd(20);
        const price = `$${product.price.toFixed(2)}`.padEnd(8);
        console.log(`${barcode} | ${name} | ${price} | ${product.stock}`);
      } else {
        console.log(`${barcode} | ❌ NOT FOUND IN DATABASE`);
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('\n📋 ALL PRODUCTS IN DATABASE:\n');
    console.log('Barcode          | Product Name              | Price');
    console.log('-'.repeat(60));
    
    products.forEach((p: any) => {
      const name = p.name.padEnd(25);
      const price = `$${p.price.toFixed(2)}`;
      console.log(`${p.barcode} | ${name} | ${price}`);
    });
    
    // Check for any issues
    console.log('\n' + '='.repeat(60));
    console.log('\n🔧 DIAGNOSTICS:\n');
    
    const productsWithoutBarcode = products.filter((p: any) => !p.barcode || p.barcode.trim() === '');
    const duplicateBarcodes = products.filter((p: any, i: number, arr: any[]) => 
      arr.findIndex((p2: any) => p2.barcode === p.barcode) !== i
    );
    
    if (productsWithoutBarcode.length > 0) {
      console.log(`❌ ${productsWithoutBarcode.length} products missing barcodes:`);
      productsWithoutBarcode.forEach((p: any) => console.log(`   - ${p.name}`));
    } else {
      console.log('✅ All products have barcodes');
    }
    
    if (duplicateBarcodes.length > 0) {
      console.log(`❌ ${duplicateBarcodes.length} duplicate barcodes found`);
    } else {
      console.log('✅ No duplicate barcodes');
    }
    
    // Check barcode format
    const invalidBarcodes = products.filter((p: any) => {
      const barcode = p.barcode;
      return !barcode || barcode.length !== 13 || !/^\d+$/.test(barcode);
    });
    
    if (invalidBarcodes.length > 0) {
      console.log(`⚠️  ${invalidBarcodes.length} products with invalid barcode format:`);
      invalidBarcodes.forEach((p: any) => console.log(`   - ${p.name}: "${p.barcode}"`));
    } else {
      console.log('✅ All barcodes are valid EAN-13 format (13 digits)');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n✨ RECOMMENDATIONS:\n');
    console.log('1. Open POS page: /pos');
    console.log('2. Check browser console for any errors');
    console.log('3. Try manual entry first: Type "1234567890001" and press Enter');
    console.log('4. If manual entry works, the issue is with camera scanner');
    console.log('5. If manual entry fails, products may not be loading properly');
    console.log('\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyBarcodeSetup();
