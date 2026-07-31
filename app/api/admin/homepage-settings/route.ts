import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { requireAuth } from '../../auth/middleware';
import { getHomepageSettings, saveHomepageSettings } from '../data-manager';

export const dynamic = 'force-dynamic';

async function extractTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin-session');
  
  console.log('[GET homepage-settings] Session cookie:', sessionCookie);
  
  if (!sessionCookie) {
    console.log('[GET homepage-settings] No admin-session cookie found');
    return undefined;
  }
  
  const parts = sessionCookie.value.split(':');
  console.log('[GET homepage-settings] Cookie parts:', parts.length);
  
  // Format: github-oauth:username:token:timestamp
  if (parts.length === 4) {
    console.log('[GET homepage-settings] Token extracted successfully');
    return parts[2];
  }
  
  return undefined;
}

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookie for read operations
    const token = await extractTokenFromCookie();
    console.log('[GET homepage-settings] Token available?', !!token);
    const settings = await getHomepageSettings(token);
    const response = NextResponse.json({ success: true, data: settings });
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error fetching homepage settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch homepage settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    // Use server-side GITHUB_TOKEN (PAT) for write operations instead of user OAuth token
    // This ensures commits use a token with bypass permissions for branch protection
    const serverToken = process.env.GITHUB_TOKEN;
    const userToken = await extractTokenFromCookie();
    
    console.log('[homepage-settings/POST] GITHUB_TOKEN available:', !!serverToken);
    console.log('[homepage-settings/POST] Using token from:', serverToken ? 'ENVIRONMENT' : 'COOKIE');
    
    const token = serverToken || userToken;
    
    if (!token) {
      console.log('[POST homepage-settings] No token found, returning 401');
      return NextResponse.json(
        { success: false, message: 'GitHub token not found. Please log in again.' },
        { status: 401 }
      );
    }

    const settings = await request.json();

    const saved = await saveHomepageSettings(settings, token);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: 'Homepage settings saved successfully and committed to GitHub',
        data: settings 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save homepage settings to GitHub' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving homepage settings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}