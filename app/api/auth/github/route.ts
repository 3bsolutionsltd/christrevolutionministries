import { NextRequest, NextResponse } from 'next/server'

// GitHub OAuth configuration - Environment Aware
const isStaging = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging'

// Environment-specific OAuth credentials
const GITHUB_CLIENT_ID = isStaging 
  ? (process.env.GITHUB_STAGING_CLIENT_ID || process.env.GITHUB_CLIENT_ID)
  : process.env.GITHUB_CLIENT_ID

const GITHUB_CLIENT_SECRET = isStaging
  ? (process.env.GITHUB_STAGING_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET) 
  : process.env.GITHUB_CLIENT_SECRET

const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + '/admin-oauth-login.html'

// Handle OAuth callback from GitHub (GET request)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    if (error) {
      return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url))
    }
    
    if (!code) {
      return NextResponse.redirect(new URL('/admin/login?error=no_code', request.url))
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: request.nextUrl.origin + '/api/auth/github',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.redirect(new URL(`/admin/login?error=${tokenData.error}`, request.url))
    }

    // Verify the token works and user has repository access
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!userResponse.ok) {
      return NextResponse.redirect(new URL('/admin/login?error=user_fetch_failed', request.url))
    }

    const userData = await userResponse.json()

    // Check if user has access to the repository
    const repoResponse = await fetch('https://api.github.com/repos/3bsolutionsltd/christrevolutionministries', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!repoResponse.ok) {
      return NextResponse.redirect(new URL('/admin/login?error=no_repo_access', request.url))
    }

    const repoData = await repoResponse.json()
    
    if (!repoData.permissions?.push) {
      return NextResponse.redirect(new URL('/admin/login?error=no_write_permissions', request.url))
    }

    // Create redirect response to admin panel
    const redirectUrl = new URL('/admin', request.url)
    const response = NextResponse.redirect(redirectUrl)
    
    // Set admin session cookie with timestamp for expiration tracking
    const timestamp = Date.now();
    response.cookies.set('admin-session', `github-oauth:${userData.login}:${tokenData.access_token}:${timestamp}`, {
      httpOnly: true,
      secure: true, // Always secure for production
      sameSite: 'none', // Required for cross-site cookies
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/' // Ensure cookie is available across all paths
    })
    
    return response

  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', request.url))
  }
}

// Handle POST requests from client-side OAuth flow (legacy support)
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json({ error: 'Authorization code required' }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 })
    }

    // Verify the token works and user has repository access
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to get user info' }, { status: 400 })
    }

    const userData = await userResponse.json()

    // Check if user has access to the repository
    const repoResponse = await fetch('https://api.github.com/repos/3bsolutionsltd/christrevolutionministries', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!repoResponse.ok) {
      return NextResponse.json({ 
        error: 'You do not have access to this repository. Please contact the administrator to be added as a collaborator.' 
      }, { status: 403 })
    }

    const repoData = await repoResponse.json()
    
    if (!repoData.permissions?.push) {
      return NextResponse.json({ 
        error: 'You do not have write permissions to this repository.' 
      }, { status: 403 })
    }

    // Create response with session cookie for compatibility with existing backend
    const response = NextResponse.json({
      success: true,
      access_token: tokenData.access_token,
      user: {
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
      },
    })
    
    // Set admin session cookie with timestamp for expiration tracking
    const timestamp = Date.now();
    response.cookies.set('admin-session', `github-oauth:${userData.login}:${tokenData.access_token}:${timestamp}`, {
      httpOnly: true,
      secure: true, // Always secure for production
      sameSite: 'none', // Required for cross-site cookies
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/' // Ensure cookie is available across all paths
    })
    
    return response

  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}