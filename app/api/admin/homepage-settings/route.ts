import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getHomepageSettings, saveHomepageSettings, extractTokenFromCookie } from '../data-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookie for read operations
    const token = extractTokenFromCookie(request.headers.get('cookie'));
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
    // Extract token from cookie for write operations
    const token = extractTokenFromCookie(request.headers.get('cookie'));
    
    if (!token) {
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