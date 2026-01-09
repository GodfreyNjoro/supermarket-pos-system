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

    // Validate input
    if (!host || !port || !database || !username) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Test connection
    const client = new Client({
      host,
      port: parseInt(port, 10),
      database,
      user: username,
      password,
      connectionTimeoutMillis: 5000
    });

    await client.connect();
    
    // Test query
    const result = await client.query('SELECT version()');
    const version = result.rows[0]?.version || 'Unknown';
    
    await client.end();

    return NextResponse.json({
      success: true,
      message: `Connected successfully! PostgreSQL ${version.split(' ')[1] || ''}`
    });
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    
    let message = 'Connection failed';
    if (error.code === 'ECONNREFUSED') {
      message = 'Connection refused. Is PostgreSQL running?';
    } else if (error.code === '28P01') {
      message = 'Authentication failed. Check username/password.';
    } else if (error.code === '3D000') {
      message = 'Database does not exist.';
    } else if (error.message) {
      message = error.message;
    }

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
