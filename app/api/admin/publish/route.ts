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

      const webhookUrl = process.env.DEPLOYMENT_WEBHOOK_URL;
      const githubToken = process.env.GITHUB_TOKEN;
      let deploymentResult = { success: false, message: '' };

      if (githubToken) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/3bsolutionsltd/christrevolutionministries/actions/workflows/deploy.yml/dispatches`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ref: 'main',
                inputs: {
                  environment: target
                }
              })
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.warn('⚠️ GitHub Actions dispatch failed:', errorText);
            deploymentResult = {
              success: false,
              message: `GitHub Actions dispatch failed: ${response.status} ${response.statusText} — ${errorText}`
            };
          } else {
            deploymentResult = { success: true, message: 'GitHub Actions workflow dispatch triggered successfully.' };
          }
        } catch (dispatchError) {
          console.warn('⚠️ GitHub Actions dispatch error:', dispatchError);
          deploymentResult = { success: false, message: `GitHub Actions dispatch error: ${dispatchError}` };
        }
      }

      if (!deploymentResult.success && webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target, timestamp: new Date().toISOString() })
          });

          if (!response.ok) {
            console.warn('⚠️ Deployment webhook failed:', response.statusText);
            deploymentResult = { success: false, message: `Deployment webhook failed: ${response.statusText}` };
          } else {
            deploymentResult = { success: true, message: 'Deployment webhook triggered successfully.' };
          }
        } catch (webhookError) {
          console.warn('⚠️ Deployment webhook error:', webhookError);
          deploymentResult = { success: false, message: `Deployment webhook error: ${webhookError}` };
        }
      }

      if (!deploymentResult.success) {
        const noMethodConfigured = !githubToken && !webhookUrl;
        if (noMethodConfigured) {
          // Neither deployment method is configured. Content is already committed to GitHub
          // and deployment will trigger automatically via the push event on the deploy.yml workflow.
          // Return a warning rather than a hard error so admins know what happened.
          console.warn('⚠️ No deployment method configured (GITHUB_TOKEN / DEPLOYMENT_WEBHOOK_URL). Deployment will happen automatically via GitHub push.');
          return NextResponse.json({
            success: true,
            warning: true,
            message: 'Content is saved to the repository. Automatic deployment via GitHub push is active, but no manual dispatch method is configured.',
            info: 'To enable manual deployment triggers, set GITHUB_TOKEN (a GitHub PAT with "workflow" scope) or DEPLOYMENT_WEBHOOK_URL in your Vercel environment variables.',
            timestamp: new Date().toISOString()
          });
        }

        return NextResponse.json(
          {
            success: false,
            error: 'Unable to trigger deployment. Check GITHUB_TOKEN or DEPLOYMENT_WEBHOOK_URL.',
            details: deploymentResult.message
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Content published! ${deploymentResult.message}`,
        info: 'Changes are committed to GitHub and deployment has been triggered.',
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