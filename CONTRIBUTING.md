# Contributing to Christ Revolution Ministries Website

## Git Workflow Guide

This guide explains how to properly manage changes between your development environment (codespace) and the main branch.

### Current Repository Status
- **Main Branch**: Contains the stable version of the website documentation
- **Development Branches**: Feature branches for ongoing work
- **Files**: README.md (redesign plan), index.md (content structure)

## Workflow for Merging Changes from Codespace to Main

### 1. Check Current Status
Before making any changes, check your current branch and status:

```bash
# Check which branch you're on
git branch

# Check for uncommitted changes
git status

# See recent commits
git log --oneline -5
```

### 2. Sync with Remote Main Branch
Ensure you have the latest changes from the main branch:

```bash
# Fetch latest changes from remote
git fetch origin

# Switch to main branch (if needed)
git checkout main

# Pull latest changes
git pull origin main
```

### 3. Create or Switch to Development Branch
Work on a feature branch instead of directly on main:

```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Or switch to existing branch
git checkout your-existing-branch
```

### 4. Make Your Changes
Edit files as needed, then commit your changes:

```bash
# Add changes to staging
git add .

# Or add specific files
git add filename.md

# Commit with descriptive message
git commit -m "Description of your changes"
```

### 5. Push Changes to Remote
Push your branch to GitHub:

```bash
# Push feature branch to remote
git push origin feature/your-feature-name
```

### 6. Create Pull Request
1. Go to GitHub repository page
2. Click "Compare & pull request" button
3. Add description of your changes
4. Request review if needed
5. Merge when approved

### 7. Clean Up After Merge
After your PR is merged:

```bash
# Switch back to main
git checkout main

# Pull the updated main branch
git pull origin main

# Delete local feature branch (optional)
git branch -d feature/your-feature-name

# Delete remote branch (optional)
git push origin --delete feature/your-feature-name
```

## Common Scenarios

### Scenario 1: You have uncommitted changes in codespace
```bash
# Save your current work
git add .
git commit -m "Work in progress: describe changes"

# Push to your feature branch
git push origin your-branch-name
```

### Scenario 2: You want to merge current branch to main
```bash
# Ensure you're on your feature branch
git checkout your-feature-branch

# Push any pending changes
git push origin your-feature-branch

# Create a pull request on GitHub to merge into main
```

### Scenario 3: Direct merge (not recommended for main branch)
```bash
# Only if you have permission and are certain
git checkout main
git merge your-feature-branch
git push origin main
```

## Best Practices

1. **Never work directly on main branch** - Always use feature branches
2. **Use descriptive commit messages** - Explain what and why you changed
3. **Keep commits small and focused** - One logical change per commit
4. **Test before pushing** - Ensure your changes work as expected
5. **Write clear PR descriptions** - Help reviewers understand your changes

## Repository Structure

```
christrevolutionministries/
├── README.md          # Website redesign plan and specifications
├── index.md           # Main website content structure
├── CONTRIBUTING.md    # This workflow guide
└── .git/              # Git repository data
```

## File Descriptions

- **README.md**: Comprehensive website redesign plan including timeline, budget, and technical specifications
- **index.md**: Detailed content structure for the ministry website with navigation, sections, and styling notes

## Getting Help

If you encounter issues with the git workflow:

1. Check the status with `git status`
2. Review recent commits with `git log --oneline -10`
3. If you're stuck, create an issue describing:
   - What you were trying to do
   - What commands you ran
   - What error messages you received
   - Current output of `git status`

## Quick Reference Commands

```bash
# Check status
git status
git branch
git log --oneline -5

# Basic workflow
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Sync with main
git checkout main
git pull origin main
git checkout feature/new-feature
git merge main  # if needed
```