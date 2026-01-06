import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkConflicts() {
  try {
    // New barcodes we want to use
    const newBarcodes = [
      '1234567890012',
      '1234567890180',
      '1234567890258',
      '1234567890326',
      '1234567890494',
      '1234567890562',
    ];
    
    console.log('🔍 Checking for barcode conflicts...\n');
    
    // Check if any new barcodes already exist
    for (const barcode of newBarcodes) {
      const existing = await prisma.product.findUnique({
        where: { barcode },
        select: { name: true, barcode: true }
      });
      
      if (existing) {
        console.log(`❌ CONFLICT: ${barcode} already exists (${existing.name})`);
      } else {
        console.log(`✅ ${barcode} - available`);
      }
    }
    
    console.log('\n📋 Current database barcodes:');
    const allProducts = await prisma.product.findMany({
      select: { name: true, barcode: true },
      orderBy: { barcode: 'asc' }
    });
    
    allProducts.forEach(p => {
      console.log(`  ${p.barcode} - ${p.name}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConflicts();
