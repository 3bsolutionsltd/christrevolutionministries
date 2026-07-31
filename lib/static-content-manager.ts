"use client";
import { useState, useEffect } from 'react';

/**
 * GitHub-based Content Management
 * For static hosting environments without backend APIs
 */

interface GitHubContentManager {
  getContent: (type: string) => Promise<any[]>;
  saveContent: (type: string, data: any[]) => Promise<boolean>;
  authenticate: (token: string) => Promise<boolean>;
}

class StaticContentManager implements GitHubContentManager {
  private token: string = '';
  private repoOwner = '3bsolutionsltd';
  private repoName = 'christrevolutionministries';

  constructor() {
    // Check for stored GitHub token
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('github-token') || '';
    }
  }

  async authenticate(token: string): Promise<boolean> {
    try {
      this.token = token;
      
      // Test the token by making a simple API call
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        localStorage.setItem('github-token', token);
        return true;
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  async getContent(type: string): Promise<any[]> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/public/api/${type}.json`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        return content;
      } else {
        throw new Error(`Failed to fetch ${type}`);
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  }

  async saveContent(type: string, data: any[]): Promise<boolean> {
    try {
      // Get current file to get SHA
      const currentResponse = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/public/api/${type}.json`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let sha = '';
      if (currentResponse.ok) {
        const currentData = await currentResponse.json();
        sha = currentData.sha;
      }

      // Update file
      const updateResponse = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/public/api/${type}.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update ${type} from static admin - ${new Date().toISOString()}`,
          content: btoa(JSON.stringify(data, null, 2)),
          sha: sha || undefined
        })
      });

      return updateResponse.ok;
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      return false;
    }
  }

  async triggerDeployment(): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows/deploy.yml/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            environment: 'staging'
          }
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error triggering deployment:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const useStaticContentManager = () => {
  const [contentManager] = useState(() => new StaticContentManager());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(contentManager.isAuthenticated());
  }, [contentManager]);

  const authenticate = async (token: string) => {
    const success = await contentManager.authenticate(token);
    setIsAuthenticated(success);
    return success;
  };

  return {
    contentManager,
    isAuthenticated,
    authenticate
  };
};

export default StaticContentManager;