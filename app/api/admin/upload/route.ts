import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../auth/middleware';
import { getTokenFromCookie } from '../data-manager';

export const dynamic = 'force-dynamic';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = '3bsolutionsltd';
const REPO_NAME = 'christrevolutionministries';
const BRANCH = 'main';

/**
 * Upload file to GitHub repository
 */
async function uploadFileToGitHub(
  filename: string,
  fileBuffer: Buffer,
  token: string
): Promise<boolean> {
  const filePath = `public/uploads/${filename}`;
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
  
  // Convert buffer to base64
  const content = fileBuffer.toString('base64');
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content: content,
        branch: BRANCH
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub upload error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    // Use server-side GITHUB_TOKEN (PAT) for write operations instead of user OAuth token
    // This ensures commits use a token with bypass permissions for branch protection
    const serverToken = process.env.GITHUB_TOKEN;
    const userToken = await getTokenFromCookie();
    
    console.log('[upload/POST] GITHUB_TOKEN available:', !!serverToken);
    console.log('[upload/POST] Using token from:', serverToken ? 'ENVIRONMENT' : 'COOKIE');
    
    const token = serverToken || userToken;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'GitHub token not found. Please log in again.' },
        { status: 401 }
      );
    }

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

    // Upload to GitHub
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploaded = await uploadFileToGitHub(filename, buffer, token);

    if (!uploaded) {
      return NextResponse.json(
        { success: false, message: 'Failed to upload file to GitHub' },
        { status: 500 }
      );
    }

    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully to GitHub',
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