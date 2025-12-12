import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getSiteSettings, saveSiteSettings, getTokenFromCookie } from '../data-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const settings = await getSiteSettings(token);
    const response = NextResponse.json({ success: true, data: settings });
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token not found. Please log in again.' },
        { status: 401 }
      );
    }

    const settings = await request.json();

    const saved = await saveSiteSettings(settings, token);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: 'Site settings saved successfully and committed to GitHub',
        data: settings 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save site settings to GitHub' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving site settings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}