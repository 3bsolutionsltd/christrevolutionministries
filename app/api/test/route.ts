import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      env: {
        adminUsername: process.env.ADMIN_USERNAME || 'not-set',
        nodeEnv: process.env.NODE_ENV || 'not-set'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      success: true, 
      message: 'POST received',
      receivedData: body
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'POST error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}