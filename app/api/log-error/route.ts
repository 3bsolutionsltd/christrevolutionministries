import { NextRequest, NextResponse } from 'next/server';
import { writeFile, appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = false;

interface ErrorLog {
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  environment: string;
  type?: 'javascript' | 'promise' | 'resource' | 'react';
}

export async function POST(request: NextRequest) {
  try {
    const errorData: ErrorLog = await request.json();
    
    // Only log errors in staging/production, not development
    if (process.env.NODE_ENV === 'development') {
      console.log('Error logged (development):', errorData);
      return NextResponse.json({ success: true, message: 'Error logged to console' });
    }

    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    // Create log entry
    const logEntry = {
      ...errorData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      severity: getSeverity(errorData),
      parsed: {
        browser: parseBrowser(errorData.userAgent),
        timestamp: new Date(errorData.timestamp).toLocaleString()
      }
    };

    // Write to daily log file
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `errors-${today}.json`);
    
    let existingLogs = [];
    if (existsSync(logFile)) {
      try {
        const fileContent = await import('fs').then(fs => 
          fs.promises.readFile(logFile, 'utf-8')
        );
        existingLogs = JSON.parse(fileContent);
      } catch (parseError) {
        console.error('Failed to parse existing log file:', parseError);
      }
    }

    existingLogs.push(logEntry);
    await writeFile(logFile, JSON.stringify(existingLogs, null, 2));

    // Also append to a simple text log for easy reading
    const textLogFile = path.join(logsDir, `errors-${today}.log`);
    const textEntry = `[${logEntry.parsed.timestamp}] ${logEntry.severity.toUpperCase()} - ${logEntry.message}\n  URL: ${logEntry.url}\n  Browser: ${logEntry.parsed.browser}\n  Stack: ${logEntry.stack || 'N/A'}\n\n`;
    
    await appendFile(textLogFile, textEntry);

    // Send email notification for critical errors (optional)
    if (logEntry.severity === 'critical') {
      await notifyOfCriticalError(logEntry);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Error logged successfully',
      logId: logEntry.id 
    });

  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to log error' },
      { status: 500 }
    );
  }
}

function getSeverity(errorData: ErrorLog): 'low' | 'medium' | 'high' | 'critical' {
  const message = errorData.message.toLowerCase();
  
  // Critical errors that break functionality
  if (message.includes('chunk') || 
      message.includes('network') || 
      message.includes('failed to fetch') ||
      errorData.type === 'promise') {
    return 'critical';
  }
  
  // High priority errors
  if (message.includes('typeerror') || 
      message.includes('referenceerror') ||
      errorData.type === 'react') {
    return 'high';
  }
  
  // Medium priority
  if (errorData.type === 'resource') {
    return 'medium';
  }
  
  return 'low';
}

function parseBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

async function notifyOfCriticalError(errorData: any) {
  // Here you could integrate with email services, Slack, Discord, etc.
  // For now, just log to console
  console.error('🚨 CRITICAL ERROR DETECTED:', {
    message: errorData.message,
    url: errorData.url,
    timestamp: errorData.timestamp
  });
  
  // Example: Send to Discord webhook (uncomment to use)
  /*
  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚨 **Critical Error on ${errorData.environment}**\n\`\`\`\n${errorData.message}\n\`\`\`\n**URL:** ${errorData.url}\n**Time:** ${errorData.timestamp}`
      })
    });
  } catch (notifyError) {
    console.error('Failed to send notification:', notifyError);
  }
  */
}
