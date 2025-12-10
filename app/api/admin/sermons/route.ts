import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getSermons, saveSermons } from '../data-manager';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    const sermons = await getSermons();
    return NextResponse.json({ success: true, data: sermons });
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch sermons' },
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

    const sermons = await getSermons();

    switch (action) {
      case 'add':
        const newSermon = {
          ...data,
          id: Date.now(), // Simple ID generation
        };
        sermons.push(newSermon);
        break;

      case 'update':
        const index = sermons.findIndex((s: any) => s.id === data.id);
        if (index !== -1) {
          sermons[index] = data;
        } else {
          return NextResponse.json(
            { success: false, message: 'Sermon not found' },
            { status: 404 }
          );
        }
        break;

      case 'delete':
        const deleteIndex = sermons.findIndex((s: any) => s.id === data.id);
        if (deleteIndex !== -1) {
          sermons.splice(deleteIndex, 1);
        } else {
          return NextResponse.json(
            { success: false, message: 'Sermon not found' },
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

    const saved = await saveSermons(sermons);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: `Sermon ${action}d successfully`,
        data: sermons 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save sermons' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error managing sermons:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}