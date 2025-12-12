import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getEvents, saveEvents, getTokenFromCookie } from '../data-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    const events = await getEvents(token);
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token not found. Please log in again.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    const events = await getEvents(token);

    switch (action) {
      case 'add':
        const newEvent = {
          ...data,
          id: Date.now(), // Simple ID generation
        };
        events.push(newEvent);
        break;

      case 'update':
        const index = events.findIndex((e: any) => e.id === data.id);
        if (index !== -1) {
          events[index] = data;
        } else {
          return NextResponse.json(
            { success: false, message: 'Event not found' },
            { status: 404 }
          );
        }
        break;

      case 'delete':
        const deleteIndex = events.findIndex((e: any) => e.id === data.id);
        if (deleteIndex !== -1) {
          events.splice(deleteIndex, 1);
        } else {
          return NextResponse.json(
            { success: false, message: 'Event not found' },
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

    const saved = await saveEvents(events, token);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: `Event ${action}d successfully and committed to GitHub`,
        data: events 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save events to GitHub' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error managing events:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}