import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Static export configuration
export const dynamic = 'force-static'

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    // Verify webhook signature (optional but recommended)
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const expectedSignature = `sha256=${crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')}`;
      
      if (signature !== expectedSignature) {
        console.log('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Parse the webhook payload
    const payload = JSON.parse(body);
    
    // Log webhook events for debugging
    console.log('GitHub Webhook Event:', {
      event: request.headers.get('x-github-event'),
      action: payload.action,
      repository: payload.repository?.name,
      sender: payload.sender?.login
    });

    // Handle specific webhook events
    const eventType = request.headers.get('x-github-event');
    
    switch (eventType) {
      case 'push':
        console.log('Repository push event received');
        // You could trigger content refresh here if needed
        break;
        
      case 'repository':
        console.log('Repository event received:', payload.action);
        break;
        
      case 'ping':
        console.log('Webhook ping received - webhook is working!');
        break;
        
      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ 
      message: 'Webhook received successfully',
      event: eventType 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' }, 
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ 
    message: 'GitHub webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}