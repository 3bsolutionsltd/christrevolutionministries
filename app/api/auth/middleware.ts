import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '../../session-store';

// Session expiration time (24 hours)
const SESSION_EXPIRY = 24 * 60 * 60 * 1000;

export async function requireAuth(request: NextRequest) {
  try {
    // Try Authorization header first (your original system)
    const authHeader = request.headers.get('authorization');
    const sessionId = authHeader?.replace('Bearer ', '');
    
    if (sessionId && validateSession(sessionId)) {
      return null; // Authentication successful
    }
    
    // Try cookie-based session (GitHub OAuth or other cookie auth)
    const session = request.cookies.get('admin-session');
    if (session && session.value) {
      // Check if it's a GitHub OAuth session
      if (session.value.startsWith('github-oauth:')) {
        const [, username, token, timestamp] = session.value.split(':');
        
        // Check session expiration
        if (timestamp) {
          const sessionTime = parseInt(timestamp);
          if (Date.now() - sessionTime > SESSION_EXPIRY) {
            // Session expired, clear cookie
            const response = NextResponse.json(
              { success: false, message: 'Session expired' },
              { status: 401 }
            );
            response.cookies.delete('admin-session');
            return response;
          }
        }
        
        // Verify the GitHub token is still valid
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
              return null; // GitHub OAuth authentication successful
            }
          } else if (response.status === 401) {
            // Token is invalid, clear session
            const authResponse = NextResponse.json(
              { success: false, message: 'GitHub token expired' },
              { status: 401 }
            );
            authResponse.cookies.delete('admin-session');
            return authResponse;
          }
        } catch (error) {
          console.error('GitHub token validation error:', error);
        }
      } else {
        // Try validating as regular session ID
        if (validateSession(session.value)) {
          return null; // Cookie-based session authentication successful
        }
      }
    }

    return NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}