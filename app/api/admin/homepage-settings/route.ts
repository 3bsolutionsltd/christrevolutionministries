import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getHomepageSettings, saveHomepageSettings } from '../settings-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getHomepageSettings();
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
    const settings = await request.json();

    const saved = await saveHomepageSettings(settings);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: 'Homepage settings saved successfully',
        data: settings 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save homepage settings' },
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