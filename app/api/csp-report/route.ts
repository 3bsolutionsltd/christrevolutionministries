import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const report = await req.json()
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      ...report
    }

    // Ensure logs directory exists
    const logsDir = path.join(process.cwd(), 'logs', 'csp')
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }

    // Write to daily log file
    const date = timestamp.split('T')[0]
    const logFile = path.join(logsDir, `csp-${date}.json`)
    
    let logs = []
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf8')
      logs = JSON.parse(content)
    }
    
    logs.push(logEntry)
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2))

    // Also write to console for immediate visibility
    console.log('[CSP Violation]', logEntry)

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('[CSP Report Error]', error)
    return new Response(JSON.stringify({ error: 'Failed to process CSP report' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}