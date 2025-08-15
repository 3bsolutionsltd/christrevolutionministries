# Christ Revolution Ministries Documentation Repository

Christ Revolution Ministries is a documentation repository containing website redesign plans and content structure for a church ministry website. This repository contains exclusively markdown documentation with no build systems, applications, or tests.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Repository Structure
```
/home/runner/work/christrevolutionministries/christrevolutionministries/
├── .github/
│   └── copilot-instructions.md  # This file
├── README.md                    # Website redesign plan and project overview
└── index.md                     # Content structure and layout for church website
```

### Essential Commands
- Navigate to repository: `cd /home/runner/work/christrevolutionministries/christrevolutionministries`
- Install markdown validator: `sudo apt-get update && sudo apt-get install -y pandoc` -- takes 2-3 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- Validate markdown syntax: 
  - `pandoc README.md -t html -o /tmp/readme-test.html`
  - `pandoc index.md -t html -o /tmp/index-test.html`
- Count lines in files: `wc -l *.md`
- Search across all markdown files: `grep -rn "search term" *.md`
- View file differences: `git diff`
- Check repository status: `git status`

### File Purposes
- **README.md**: Contains the complete website redesign plan including project overview, objectives, scope of work, timeline, and budget for Christ Revolution Ministries website
- **index.md**: Contains detailed content structure, navigation, sections (Hero, About, Ministries, Sermons, Events, Volunteer, Give, Contact), and layout guidelines for the church website

## Validation

### Markdown Validation
- ALWAYS validate markdown syntax after making changes: `pandoc filename.md -t html -o /tmp/test.html`
- If pandoc is not installed, install it first: `sudo apt-get update && sudo apt-get install -y pandoc`
- All existing markdown files validate successfully with pandoc

### Content Validation  
- ALWAYS verify that content changes align with the ministry's mission and values
- Ensure contact information remains accurate:
  - Address: Bulaga, Nakabugo Zion Estate, Doctor's Drive, Kampala, Uganda
  - Phone: +256‑772‑245292 | +256‑755‑490034  
  - Email: info@christrevolutionministries.org
- Maintain consistency in ministry naming: "Christ Revolution Ministries" or "Christ Revolution Ministry"

### Manual Testing Scenarios
Since this is a documentation repository, validate changes by:
1. **Content Review**: Read through modified sections to ensure clarity and accuracy
2. **Structure Check**: Verify markdown headers, lists, and tables render correctly
3. **Link Validation**: Ensure any internal references between files are accurate
4. **Consistency Check**: Verify terminology and branding consistency across files

## Common Tasks

### Repository Navigation
- **Repository root**: `/home/runner/work/christrevolutionministries/christrevolutionministries/`
- **List all files**: `ls -la` shows: README.md, index.md, .git/, .github/
- **File sizes**: README.md (113 lines), index.md (144 lines), total 257 lines of documentation

### Key Content Sections in README.md
- Project Overview: Website redesign objectives and goals
- Scope of Work: 7-phase development plan (Discovery, Design, Interactive Features, E-Commerce, Professional Updates, Testing, Support)
- Timeline: 8-9 week project timeline with ongoing support
- Budget: $400 development cost plus $150/year maintenance
- Mission Statement: Ministry's core purpose and vision

### Key Content Sections in index.md
- Navigation structure for website
- Hero section with ministry tagline
- About Us: Vision, Mission, Leadership (Pastor Samuel Isiko)
- Ministries: Children, Youth & Students, Family, Music & Worship
- Sermons, Events, Volunteer opportunities
- Contact information and donation options
- Footer and styling guidelines

### Content References
- **Ministry tagline**: "Blessed to be a blessing"
- **Vision**: "To take this generation back to God and make His voice heard in the nations"
- **Mission**: "To multiply disciples for ministry through evangelism, discipleship, and prayer"
- **Leadership**: Led by Pastor Samuel Isiko

## Limitations and Constraints

### What This Repository Does NOT Have
- No build systems (npm, yarn, bundle, make, etc.)
- No testing frameworks
- No CI/CD pipelines or GitHub Actions
- No applications to run or start
- No dependencies to install (except documentation tools like pandoc)
- No compilation or deployment processes

### What You CANNOT Do
- Run applications or servers (none exist)
- Execute build commands (no build system present)  
- Run automated tests (no test suite exists)
- Install project dependencies (only documentation tools available)

### What You CAN Do
- Edit markdown documentation files
- Validate markdown syntax with pandoc
- Search and analyze content across files
- Review and update project plans and content structure
- Maintain consistency in ministry information and branding

## Best Practices

### Making Changes
- ALWAYS validate markdown after editing: `pandoc filename.md -t html -o /tmp/test.html`
- Use consistent markdown formatting throughout files
- Maintain existing structure and organization
- Preserve important contact information and ministry details
- Keep content aligned with ministry values and mission

### Content Guidelines
- Use imperative tone for action items
- Maintain professional, reverent language appropriate for ministry context
- Ensure accuracy of contact details, dates, and project information
- Keep technical specifications realistic and achievable
- Preserve existing formatting patterns and section structures

### Time Expectations
- Pandoc installation: 2-3 minutes (with good internet connection)
- Markdown validation: < 1 second per file
- File editing: Instant with text editors
- Content review: 2-5 minutes per file depending on changes

**CRITICAL REMINDERS:**
- This is a documentation-only repository - no applications exist to build or run
- Always validate markdown syntax after making changes
- Maintain accuracy of ministry contact information and details  
- Keep content aligned with ministry mission and values
- Use search commands to find content quickly across both files