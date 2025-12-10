import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '../../../session-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from Authorization header
    const authHeader = request.headers.get('authorization');
    const sessionId = authHeader?.replace('Bearer ', '');
    
    console.log('Auth check - Session ID received:', sessionId ? 'yes' : 'no');
    
    if (sessionId && validateSession(sessionId)) {
      console.log('Auth check - Valid session');
      return NextResponse.json({ 
        success: true, 
        authenticated: true,
        message: 'User is authenticated' 
      });
    }
    
    console.log('Auth check - Invalid or missing session');
    return NextResponse.json({ 
      success: true, 
      authenticated: false,
      message: 'User is not authenticated' 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}