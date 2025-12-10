import { NextRequest, NextResponse } from 'next/server';
import ContentSync from '../../../../lib/content-sync';

/**
 * Publish Content API
 * Allows admin to publish changes to static sites
 */

// Force dynamic for admin server functionality
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Only allow in admin mode
    if (process.env.ADMIN_MODE !== 'true') {
      return NextResponse.json(
        { error: 'Publishing not available in static mode' },
        { status: 403 }
      );
    }

    // Validate admin session (reuse existing auth)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionId = authHeader.substring(7);
    
    // Import session store
    const { validateSession } = await import('../../../session-store');
    const session = validateSession(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, target } = body;

    const contentSync = new ContentSync();

    if (action === 'sync') {
      // Sync content to GitHub
      const syncResult = await contentSync.syncContentToGitHub();
      
      if (syncResult) {
        return NextResponse.json({
          success: true,
          message: 'Content synced to repository'
        });
      } else {
        return NextResponse.json(
          { error: 'Failed to sync content' },
          { status: 500 }
        );
      }
    }

    if (action === 'publish') {
      // Sync and trigger deployment
      console.log(`📤 Publishing to ${target}...`);
      
      const syncResult = await contentSync.syncContentToGitHub();
      if (!syncResult) {
        return NextResponse.json(
          { error: 'Failed to sync content to repository' },
          { status: 500 }
        );
      }

      const deployResult = await contentSync.triggerDeployment();
      if (!deployResult) {
        return NextResponse.json(
          { error: 'Failed to trigger deployment' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Content published and deployment triggered for ${target}`,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Publish API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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