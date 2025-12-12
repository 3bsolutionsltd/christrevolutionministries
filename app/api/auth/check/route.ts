import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '../../../session-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from Authorization header
    const authHeader = request.headers.get('authorization');
    const sessionId = authHeader?.replace('Bearer ', '');
    
    console.log('Auth check - Session ID received:', sessionId ? 'yes' : 'no');
    
    // Check traditional session first
    if (sessionId && validateSession(sessionId)) {
      console.log('Auth check - Valid traditional session');
      return NextResponse.json({ 
        success: true, 
        authenticated: true,
        message: 'User is authenticated' 
      });
    }
    
    // Check for GitHub OAuth session
    if (sessionId === 'github-oauth-session') {
      // Check if GitHub token exists in cookie (set by OAuth flow)
      const session = request.cookies.get('admin-session');
      if (session && session.value.startsWith('github-oauth:')) {
        const parts = session.value.split(':');
        const username = parts[1];
        const token = parts[2];
        const timestamp = parts[3] ? parseInt(parts[3]) : null;
        
        // Verify GitHub token is still valid
        try {
          const response = await fetch('https://api.github.com/user', {
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            if (userData.login === username) {
              console.log('Auth check - Valid GitHub OAuth session');
              return NextResponse.json({ 
                success: true, 
                authenticated: true,
                message: 'User is authenticated via GitHub OAuth' 
              });
            }
          }
        } catch (error) {
          console.error('GitHub token validation error:', error);
        }
      }
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