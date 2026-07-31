import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Static export configuration
export const dynamic = 'force-static'

// Content management API endpoints
const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readJsonFile(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeJsonFile(filename: string, data: any) {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    let data
    switch (type) {
      case 'ministries':
        data = await readJsonFile('ministries.json')
        break
      case 'sermons':
        data = await readJsonFile('sermons.json')
        break
      case 'events':
        data = await readJsonFile('events.json')
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    const newItem = await request.json()
    
    let filename
    switch (type) {
      case 'ministries':
        filename = 'ministries.json'
        break
      case 'sermons':
        filename = 'sermons.json'
        break
      case 'events':
        filename = 'events.json'
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const data = await readJsonFile(filename)
    
    // Add ID if not present
    if (!newItem.id) {
      newItem.id = Date.now()
    }

    data.push(newItem)
    await writeJsonFile(filename, data)

    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  try {
    const updatedItem = await request.json()
    
    let filename
    switch (type) {
      case 'ministries':
        filename = 'ministries.json'
        break
      case 'sermons':
        filename = 'sermons.json'
        break
      case 'events':
        filename = 'events.json'
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const data = await readJsonFile(filename)
    const index = data.findIndex((item: any) => item.id.toString() === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    data[index] = { ...data[index], ...updatedItem }
    await writeJsonFile(filename, data)

    return NextResponse.json({ success: true, item: data[index] })
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  try {
    let filename
    switch (type) {
      case 'ministries':
        filename = 'ministries.json'
        break
      case 'sermons':
        filename = 'sermons.json'
        break
      case 'events':
        filename = 'events.json'
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const data = await readJsonFile(filename)
    const filteredData = data.filter((item: any) => item.id.toString() !== id)
    
    if (data.length === filteredData.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    await writeJsonFile(filename, filteredData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}