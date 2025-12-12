/**
 * GitHub Storage Adapter
 * 
 * This module provides storage functions that use GitHub as a backend.
 * When content is saved, it commits changes directly to the repository,
 * which triggers automatic deployment to Hostinger via GitHub Actions.
 */

interface GitHubFileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = '3bsolutionsltd';
const REPO_NAME = 'christrevolutionministries';
const BRANCH = 'main';

/**
 * Get GitHub token from environment or from OAuth session
 */
function getGitHubToken(): string | null {
  // First try environment variable (for server-side operations)
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }
  
  // Note: In production, the token should come from the authenticated user's session
  // This will be passed from the API route that has access to the session
  return null;
}

/**
 * Read a file from GitHub repository
 */
export async function readGitHubFile(filePath: string, token?: string): Promise<any> {
  const githubToken = token || getGitHubToken();
  
  if (!githubToken) {
    throw new Error('GitHub token not available');
  }

  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        // File doesn't exist, return null
        return null;
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const fileData: GitHubFileContent = await response.json();
    
    // Decode base64 content
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    return {
      content: JSON.parse(content),
      sha: fileData.sha // We need this for updates
    };
  } catch (error) {
    console.error('Error reading from GitHub:', error);
    throw error;
  }
}

/**
 * Write a file to GitHub repository (creates or updates)
 */
export async function writeGitHubFile(
  filePath: string, 
  data: any, 
  commitMessage: string,
  token?: string,
  sha?: string
): Promise<boolean> {
  const githubToken = token || getGitHubToken();
  
  if (!githubToken) {
    throw new Error('GitHub token not available');
  }

  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
  
  // Convert data to base64
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
  
  try {
    const body: any = {
      message: commitMessage,
      content: content,
      branch: BRANCH
    };

    // If we have a SHA, this is an update
    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error writing to GitHub:', error);
    throw error;
  }
}

/**
 * Generic read operation with default data fallback
 */
export async function readDataFile(filePath: string, defaultData: any, token?: string) {
  try {
    const result = await readGitHubFile(filePath, token);
    
    if (result === null) {
      // File doesn't exist, return default data
      return { content: defaultData, sha: null };
    }
    
    return result;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    // On error, return default data
    return { content: defaultData, sha: null };
  }
}

/**
 * Generic write operation with commit message
 */
export async function writeDataFile(
  filePath: string, 
  data: any, 
  commitMessage: string,
  token?: string,
  sha?: string
): Promise<boolean> {
  try {
    return await writeGitHubFile(filePath, data, commitMessage, token, sha);
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}
