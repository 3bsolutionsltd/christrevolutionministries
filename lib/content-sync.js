const fs = require('fs');
const path = require('path');

/**
 * Content Synchronization System
 * Allows admin server to trigger updates to static sites
 */

class ContentSync {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'public', 'api');
    this.githubToken = process.env.GITHUB_TOKEN;
    this.repoOwner = '3bsolutionsltd';
    this.repoName = 'christrevolutionministries';
  }

  async syncContentToGitHub() {
    try {
      console.log('🔄 Syncing content to GitHub...');
      
      // Read all content files
      const contentFiles = [
        'ministries.json',
        'events.json', 
        'sermons.json',
        'youtube-links.json',
        '_metadata.json'
      ];

      const changes = [];
      
      for (const filename of contentFiles) {
        const filePath = path.join(this.contentDir, filename);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          changes.push({
            path: `public/api/${filename}`,
            content: Buffer.from(content).toString('base64')
          });
        }
      }

      // Commit changes to GitHub using GitHub API
      if (this.githubToken && changes.length > 0) {
        await this.commitToGitHub(changes);
        console.log('✅ Content synced to GitHub');
        return true;
      } else {
        console.log('⚠️ No GitHub token or no changes to sync');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Content sync failed:', error);
      return false;
    }
  }

  async commitToGitHub(changes) {
    const fetch = require('node-fetch');
    
    // Get current commit SHA
    const branchResponse = await fetch(
      `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/branches/main`,
      {
        headers: {
          'Authorization': `token ${this.githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    const branchData = await branchResponse.json();
    const currentSha = branchData.commit.sha;

    // Create tree with changes
    const treeResponse = await fetch(
      `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/git/trees`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          base_tree: currentSha,
          tree: changes.map(change => ({
            path: change.path,
            mode: '100644',
            type: 'blob',
            content: Buffer.from(change.content, 'base64').toString('utf8')
          }))
        })
      }
    );

    const treeData = await treeResponse.json();

    // Create commit
    const commitResponse = await fetch(
      `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/git/commits`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Update content from admin panel - ${new Date().toISOString()}`,
          tree: treeData.sha,
          parents: [currentSha]
        })
      }
    );

    const commitData = await commitResponse.json();

    // Update branch reference
    await fetch(
      `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/git/refs/heads/main`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${this.githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          sha: commitData.sha
        })
      }
    );

    return commitData.sha;
  }

  async triggerDeployment() {
    try {
      console.log('🚀 Triggering deployment...');
      
      const fetch = require('node-fetch');
      
      // Trigger GitHub Actions workflow
      const response = await fetch(
        `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/actions/workflows/deploy.yml/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${this.githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: {
              environment: 'staging'
            }
          })
        }
      );

      if (response.ok) {
        console.log('✅ Deployment triggered successfully');
        return true;
      } else {
        console.error('❌ Failed to trigger deployment:', await response.text());
        return false;
      }
      
    } catch (error) {
      console.error('❌ Deployment trigger failed:', error);
      return false;
    }
  }
}

module.exports = ContentSync;