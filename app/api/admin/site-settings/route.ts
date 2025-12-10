import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getSiteSettings, saveSiteSettings } from '../data-manager';

export async function GET() {
  try {
    const settings = await getSiteSettings();
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
    const settings = await request.json();

    const saved = await saveSiteSettings(settings);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: 'Site settings saved successfully',
        data: settings 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save site settings' },
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