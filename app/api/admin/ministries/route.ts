import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getMinistries, saveMinistries } from '../data-manager';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    const ministries = await getMinistries();
    return NextResponse.json({ success: true, data: ministries });
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch ministries' },
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

    const ministries = await getMinistries();

    switch (action) {
      case 'add':
        const newMinistry = {
          ...data,
          id: Date.now(), // Simple ID generation
        };
        ministries.push(newMinistry);
        break;

      case 'update':
        const index = ministries.findIndex((m: any) => m.id === data.id);
        if (index !== -1) {
          ministries[index] = data;
        } else {
          return NextResponse.json(
            { success: false, message: 'Ministry not found' },
            { status: 404 }
          );
        }
        break;

      case 'delete':
        const deleteIndex = ministries.findIndex((m: any) => m.id === data.id);
        if (deleteIndex !== -1) {
          ministries.splice(deleteIndex, 1);
        } else {
          return NextResponse.json(
            { success: false, message: 'Ministry not found' },
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

    const saved = await saveMinistries(ministries);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: `Ministry ${action}d successfully`,
        data: ministries 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save ministries' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error managing ministries:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}