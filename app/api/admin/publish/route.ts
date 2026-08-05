import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = '3bsolutionsltd';
const REPO_NAME = 'christrevolutionministries';
const DEPLOY_WORKFLOW = 'deploy.yml';

async function dispatchDeployment(target: 'staging' | 'production') {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    throw new Error('GITHUB_TOKEN is not configured for deployment dispatches');
  }

  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${DEPLOY_WORKFLOW}/dispatches`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
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
    const details = await response.text();
    throw new Error(`GitHub workflow dispatch failed: ${response.status} ${response.statusText} ${details}`.trim());
  }
}

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
      if (target !== 'staging' && target !== 'production') {
        return NextResponse.json(
          { error: 'Invalid publish target. Use "staging" or "production"' },
          { status: 400 }
        );
      }

      // Content is saved to the main branch by admin edits.
      // Publishing dispatches the workflow from main and tells it which environment to deploy.
      console.log(`📤 Publishing to ${target}...`);
      try {
        await dispatchDeployment(target);
      } catch (dispatchError) {
        console.warn('⚠️ GitHub Actions dispatch error:', dispatchError);
        return NextResponse.json(
          {
            success: false,
            error: 'Unable to trigger deployment. Check GITHUB_TOKEN permissions for workflow dispatch.',
            details: dispatchError instanceof Error ? dispatchError.message : String(dispatchError)
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: `Deployment to ${target} started successfully.`,
        info: `GitHub Actions is building the latest content from the main branch for ${target}.`,
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