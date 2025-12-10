import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function requireAuth(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session');

    if (!session || !session.value) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    return null; // Authentication successful
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}