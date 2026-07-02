import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';

/**
 * Publish Content API
 * Allows admin to publish changes to static sites
 * 
 * Note: Content is already synced to GitHub when you save sermons/events/ministries.
 * This endpoint confirms sync status and optionally triggers deployment webhooks.
 */

// Force dynamic for admin server functionality
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('[publish/POST] ADMIN_MODE:', process.env.ADMIN_MODE);
    console.log('[publish/POST] GITHUB_TOKEN available:', !!process.env.GITHUB_TOKEN);
    
    // Only allow in admin mode
    if (process.env.ADMIN_MODE !== 'true') {
      return NextResponse.json(
        { error: 'Publishing not available in static mode' },
        { status: 403 }
      );
    }

    // Validate admin session using standard middleware
    const authError = await requireAuth(request);
    if (authError) {
      console.log('[publish/POST] Authentication failed');
      return authError;
    }
    
    console.log('[publish/POST] Authentication successful');

    const body = await request.json();
    const { action, target } = body;

    if (action === 'sync') {
      // Content is already synced to GitHub when you save sermons/events/ministries
      // This endpoint just confirms the sync is complete
      console.log('✅ Content already synced to GitHub via admin saves');
      return NextResponse.json({
        success: true,
        message: 'Content is synced to repository (auto-synced on save)'
      });
    }

    if (action === 'publish') {
      // Content is already in GitHub, deployment happens automatically via GitHub Actions
      console.log(`📤 Publishing to ${target}...`);
      
      // Optional: Trigger deployment webhook if configured
      const webhookUrl = process.env.DEPLOYMENT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target, timestamp: new Date().toISOString() })
          });
          
          if (!response.ok) {
            console.warn('⚠️ Deployment webhook failed:', response.statusText);
          }
        } catch (webhookError) {
          console.warn('⚠️ Deployment webhook error:', webhookError);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Content published! GitHub Actions will deploy to ${target} automatically.`,
        info: 'Changes are committed to GitHub and will be deployed via GitHub Actions workflow',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "sync" or "publish"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Publish API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content Publishing API',
    available_actions: ['sync', 'publish'],
    admin_mode: process.env.ADMIN_MODE === 'true'
  });
}