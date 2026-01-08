import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { Client } from 'pg';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const config = await request.json();
    const { host, port, database, username, password } = config;

    const client = new Client({
      host,
      port: parseInt(port, 10),
      database,
      user: username,
      password,
      connectionTimeoutMillis: 10000
    });

    await client.connect();

    // Check if tables already exist
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'User'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      // Run Prisma migrations via shell command would be ideal,
      // but for simplicity, we'll create a basic schema
      // In production, you'd run: npx prisma migrate deploy
      
      return NextResponse.json({
        success: true,
        message: 'Database connected. Run "yarn prisma migrate deploy" to initialize schema.',
        needsMigration: true
      });
    }

    await client.end();

    return NextResponse.json({
      success: true,
      message: 'Database initialized and ready',
      needsMigration: false
    });
  } catch (error: any) {
    console.error('Database init failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to initialize database' 
    }, { status: 500 });
  }
}
