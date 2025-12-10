import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { writeFile } from 'fs/promises';
import path from 'path';
import { updateCacheVersion } from '../../../lib/cache-utils';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${originalName}`;

    // Save to public directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicPath = path.join(process.cwd(), 'public', 'uploads', filename);
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await import('fs/promises').then(fs => fs.access(uploadsDir));
    } catch {
      await import('fs/promises').then(fs => fs.mkdir(uploadsDir, { recursive: true }));
    }

    await writeFile(publicPath, buffer);

    // Update cache version to bust browser cache
    updateCacheVersion();

    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename,
        url: imageUrl,
        size: file.size,
        type: file.type
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}