import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test cloud database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      connected: true,
      message: 'Cloud database connected'
    });
  } catch (error) {
    console.error('Cloud database test failed:', error);
    return NextResponse.json({
      connected: false,
      message: 'Cloud database unreachable'
    });
  }
}
