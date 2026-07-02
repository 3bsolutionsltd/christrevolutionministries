import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getYouTubeLinks, saveYouTubeLinks, getTokenFromCookie } from '../data-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = await getTokenFromCookie();
    const links = await getYouTubeLinks(token);
    return NextResponse.json({ success: true, data: links });
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch YouTube links' },
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
    const userToken = await getTokenFromCookie();
    
    console.log('[youtube-links/POST] GITHUB_TOKEN available:', !!serverToken);
    console.log('[youtube-links/POST] Using token from:', serverToken ? 'ENVIRONMENT' : 'COOKIE');
    
    const token = serverToken || userToken;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token not found. Please log in again.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    const links = await getYouTubeLinks(token);

    switch (action) {
      case 'add':
        const newLink = {
          ...data,
          id: Date.now(), // Simple ID generation
        };
        links.push(newLink);
        break;

      case 'update':
        const index = links.findIndex((l: any) => l.id === data.id);
        if (index !== -1) {
          links[index] = data;
        } else {
          return NextResponse.json(
            { success: false, message: 'YouTube link not found' },
            { status: 404 }
          );
        }
        break;

      case 'delete':
        const deleteIndex = links.findIndex((l: any) => l.id === data.id);
        if (deleteIndex !== -1) {
          links.splice(deleteIndex, 1);
        } else {
          return NextResponse.json(
            { success: false, message: 'YouTube link not found' },
            { status: 404 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

    const saved = await saveYouTubeLinks(links, token);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: `YouTube link ${action}d successfully`,
        data: links 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save YouTube links' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error managing YouTube links:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}