import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getHeroSlides, saveHeroSlides } from '../settings-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slides = await getHeroSlides();
    const response = NextResponse.json({ success: true, data: slides });
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch hero slides' },
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

    const slides = await getHeroSlides();

    switch (action) {
      case 'add':
        const newSlide = {
          ...data,
          id: Date.now(),
        };
        slides.push(newSlide);
        break;

      case 'update':
        const index = slides.findIndex((s: any) => s.id === data.id);
        if (index !== -1) {
          slides[index] = data;
        } else {
          return NextResponse.json(
            { success: false, message: 'Slide not found' },
            { status: 404 }
          );
        }
        break;

      case 'delete':
        const deleteIndex = slides.findIndex((s: any) => s.id === data.id);
        if (deleteIndex !== -1) {
          slides.splice(deleteIndex, 1);
        } else {
          return NextResponse.json(
            { success: false, message: 'Slide not found' },
            { status: 404 }
          );
        }
        break;

      case 'reorder':
        // Reorder slides based on new order array
        const orderedSlides = data.map((id: number, index: number) => {
          const slide = slides.find((s: any) => s.id === id);
          if (slide) {
            slide.order = index + 1;
          }
          return slide;
        }).filter(Boolean);
        
        const saved = await saveHeroSlides(orderedSlides);
        if (saved) {
          return NextResponse.json({ 
            success: true, 
            message: 'Slides reordered successfully',
            data: orderedSlides 
          });
        }
        break;

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

    const saved = await saveHeroSlides(slides);
    if (saved) {
      return NextResponse.json({ 
        success: true, 
        message: `Slide ${action}d successfully`,
        data: slides 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save slides' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error managing hero slides:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}