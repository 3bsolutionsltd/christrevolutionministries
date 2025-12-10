import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getYouTubeLinks, saveYouTubeLinks } from '../data-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const links = await getYouTubeLinks();
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
    const body = await request.json();
    const { action, data } = body;

    const links = await getYouTubeLinks();

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

    const saved = await saveYouTubeLinks(links);
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