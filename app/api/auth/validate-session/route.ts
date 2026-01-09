import { NextRequest, NextResponse } from 'next/server';
import { validateSessionToken } from '@/lib/auth-options';

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionToken } = await request.json();

    if (!userId || !sessionToken) {
      return NextResponse.json({ valid: false, error: 'Missing credentials' }, { status: 400 });
    }

    const isValid = await validateSessionToken(userId, sessionToken);

    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 });
  }
}
