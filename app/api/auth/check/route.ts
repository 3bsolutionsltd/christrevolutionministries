import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('admin-session');

    if (session && session.value) {
      return NextResponse.json({ 
        success: true, 
        authenticated: true,
        message: 'User is authenticated' 
      });
    } else {
      return NextResponse.json({ 
        success: true, 
        authenticated: false,
        message: 'User is not authenticated' 
      });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}