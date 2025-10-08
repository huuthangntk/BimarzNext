# Cursor Rules for Bimarz VPN Landing Page

This directory contains Cursor AI rules that help guide development, testing, and maintenance of the Bimarz VPN Landing Page project.

## Available Rules (8 Total)

### 1. **deep-thinking-protocol.mdc** 🧠
**Type**: Always Applied
**Purpose**: Ensures thorough analysis and consideration before taking action

**What it covers**:
- When to engage deep thinking
- Four-phase thinking process (Analyze, Assess, Design, Validate)
- Information analysis and impact assessment
- Solution design and validation checks
- Application examples for different scenarios
- Quality indicators and red flags
- Special cases requiring extra consideration
- Integration with workflow (reading, writing, testing)
- Continuous improvement reflection

**When it's used**: Automatically applied to every AI interaction to ensure thoughtful, high-quality responses. Particularly important when handling complex tasks, new information, error resolution, or design decisions.

---

### 2. **project-structure.mdc** ⚙️
**Type**: Always Applied
**Purpose**: Provides comprehensive project overview and architecture understanding

**What it covers**:
- Complete project structure and file organization
- The 7-page journey explanation
- Key features and design principles
- Asset locations and development commands
- Links to all important files

**When it's used**: Automatically applied to every AI interaction to provide context about the project.

---

### 3. **coding-standards.mdc** 📝
**Type**: Applied to TypeScript/React files (*.ts, *.tsx)
**Purpose**: Enforces consistent coding standards and best practices

**What it covers**:
- TypeScript type safety guidelines
- React component patterns
- Tailwind CSS and styling conventions
- Animation standards with Framer Motion
- Component structure and organization
- Navigation and page structure
- Responsive design breakpoints
- Language and theme support patterns
- Accessibility requirements
- Performance optimization

**When it's used**: Automatically applied when editing or creating TypeScript or React files.

---

### 4. **design-system.mdc** 🎨
**Type**: Manually Applied (fetch with description keyword)
**Purpose**: Complete design system specifications

**What it covers**:
- Color palette (light/dark themes)
- Typography system (Lalezar font, sizes, weights)
- Spacing system (4px base unit)
- Layout dimensions (header, footer, etc.)
- Glass morphism and effects
- Shadow system and border radius
- Transitions and animations
- Responsive breakpoints
- Component standards (buttons, cards, etc.)
- Icon and logo standards
- Accessibility standards

**When it's used**: Reference when working on UI/UX, styling, or visual elements. Fetch using keywords like "design system", "colors", "spacing", "typography".

---

### 5. **browser-testing-qa.mdc** 🧪
**Type**: Manually Applied (fetch with description keyword)
**Purpose**: Visual testing and quality assurance protocol

**What it covers**:
- Complete testing workflow for all 7 pages
- Phase-by-phase testing approach
- Header and navigation testing
- Responsive testing (mobile, tablet, desktop)
- Visual bug detection criteria
- Bug documentation format
- Testing checklist
- Success criteria
- Files to check for common issues

**When it's used**: When performing manual QA or testing the application. Fetch using keywords like "testing", "QA", "bug detection", "visual testing".

---

### 6. **automated-browser-testing.mdc** 🤖
**Type**: Manually Applied (fetch with description keyword)  
**Purpose**: Complete automated browser testing using Playwright tools on localhost:3000

**What it covers**:
- **Step-by-step automated testing workflow**
- Browser navigation to localhost:3000
- Screenshot capture of all pages and states
- Theme toggle testing (light/dark)
- Language switcher testing (all 6 languages)
- Mobile menu testing
- Responsive testing (3 viewports: 375px, 768px, 1920px)
- Interactive element testing
- Console log analysis
- Network request analysis
- **Screenshot analysis with image reading**
- Detailed bug documentation format
- **Proof of bug-free implementation**
- Test results summary template
- Automated testing script pseudo-code
- Success criteria checklist (29 items)

**When it's used**: When asked to test the application using browser automation tools, especially for comprehensive QA with screenshot analysis and bug detection. Fetch using keywords like "automated testing", "browser testing", "screenshot analysis", "port 3000", "Playwright".

**This is the most comprehensive rule** for the specific use case you requested: using browser automation to access port 3000, take screenshots, analyze them, and make the application bug-free with proof.

---

### 7. **mcp-deep-analysis.mdc** 🧠🔍
**Type**: Always Applied (Automatic)
**Purpose**: Structured workflow using Sequential Thinking and Perplexity Search for context discovery and analysis

**What it covers**:
- **3 Sequential Thinking sessions at every chat start**
- Phase 1: Initial Analysis (Understand, Identify Gaps, Plan)
- Phase 2: Information Gathering (Perplexity Searches)
- Phase 3: Continuous Thinking (Process after EACH search)
- Phase 4: Final Synthesis
- Detailed workflow pattern and templates
- Search query best practices
- Integration with Deep Thinking Protocol
- When to trigger searches vs when to skip
- Error handling and fallback strategies
- Quality metrics and success criteria

**Workflow Pattern**:
```
Sequential Thinking x3 (Initial)
    ↓
Perplexity Search #1
    ↓
Sequential Thinking (Process)
    ↓
Perplexity Search #2
    ↓
Sequential Thinking (Process)
    ↓
Sequential Thinking (Final Synthesis)
    ↓
Implementation
```

**When it's used**: 
- **Automatically at the start of EVERY chat** - 3 initial Sequential Thinking sessions
- **After each new information arrives** - Process with Sequential Thinking
- **Before implementation** - Final synthesis
- Uses Perplexity Search when:
  - Technology/framework questions
  - Need latest best practices
  - Problem-solving with unfamiliar issues
  - Verifying approaches

**Key Features**:
- Never use all thinking sessions at once
- Always process search results before next search
- Distributed thinking pattern for better analysis
- Combines internal analysis with external research
- Ensures responses reflect latest industry standards

**Integration**: Works seamlessly with [deep-thinking-protocol.mdc](mdc:.cursor/rules/deep-thinking-protocol.mdc) - internal thinking + external research = superior solutions.

---

## How to Use These Rules

### Automatic Rules
- **deep-thinking-protocol.mdc** - Always active, ensures thorough analysis before acting
- **mcp-deep-analysis.mdc** - Always active, uses Sequential Thinking + Perplexity Search for context discovery
- **project-structure.mdc** - Always active, provides context automatically
- **bun-runtime.mdc** - Always active, ensures correct package manager usage

### File-Specific Rules  
- **coding-standards.mdc** - Automatically applies when editing `.ts` or `.tsx` files

### Manual/On-Demand Rules
To use design-system, browser-testing-qa, or automated-browser-testing rules, mention relevant keywords in your request:

**Examples**:
- "Use the design system to style this button" - Fetches design-system.mdc
- "Test the application for bugs" - Fetches browser-testing-qa.mdc  
- "Use browser automation to test localhost:3000" - Fetches automated-browser-testing.mdc
- "Take screenshots and analyze for bugs" - Fetches automated-browser-testing.mdc

## Rule Metadata

Each rule file contains frontmatter metadata that controls how it's applied:

```yaml
---
alwaysApply: true                    # Applied to every request
globs: *.ts,*.tsx                    # Applied to matching file patterns
description: "keyword description"   # Manually fetchable by description
---
```

## Testing the Application with Browser Tools

To execute the complete automated testing workflow described in **automated-browser-testing.mdc**:

1. **Ensure dev server is running**:
   ```bash
   npm run dev
   ```

2. **Request automated testing**:
   Say: "Test the application on localhost:3000 using browser automation tools and provide proof it's bug-free"

3. **The AI will**:
   - Navigate to http://localhost:3000
   - Take 50+ screenshots of all pages, themes, languages, and viewports
   - Test all interactive elements
   - Analyze console logs and network requests
   - Document any bugs found with evidence
   - Provide comprehensive test results summary
   - Generate proof of bug-free implementation

## Updating Rules

To update a rule:
1. Edit the corresponding `.mdc` file
2. Ensure frontmatter metadata is correct
3. Save and the rule updates automatically

To create a new rule:
1. Create a new `.mdc` file in this directory
2. Add proper frontmatter (see examples above)
3. Write the rule content in Markdown
4. Reference project files using: `[filename](mdc:path/to/filename)`

## Related Documentation

- [README.md](mdc:README.md) - Project overview
- [PROJECT_SUMMARY.md](mdc:PROJECT_SUMMARY.md) - Complete project summary
- [IMPLEMENTATION_NOTES.md](mdc:IMPLEMENTATION_NOTES.md) - Technical details
- [theme.json](mdc:theme.json) - Design system specs

## The Deep Thinking Advantage

The **deep-thinking-protocol.mdc** rule is a meta-rule that enhances all other rules by ensuring:

1. **Quality over Speed**: Taking time to analyze prevents costly mistakes
2. **Proactive Problem Prevention**: Thinking ahead catches issues before they occur
3. **Consistent Excellence**: Every interaction benefits from structured analysis
4. **Learning Loop**: Continuous improvement through reflection

**The 4-Phase Process**:
```
Phase 1: Information Analysis (15s)  - What do I know? What do I need?
Phase 2: Impact Assessment (15s)     - What's affected? What are the risks?
Phase 3: Solution Design (15s)       - What's the best approach? What's the order?
Phase 4: Validation Check (10s)      - Am I ready? Have I considered everything?
```

## The MCP Deep Analysis Advantage

The **mcp-deep-analysis.mdc** rule enhances decision-making by combining internal analysis with external research:

**How It Works:**

1. **Structured Initial Thinking** (3 Sessions)
   - Understand what you're being asked
   - Identify knowledge gaps systematically
   - Plan targeted information gathering

2. **Targeted Research** (Perplexity Searches)
   - Get latest best practices and updates
   - Verify approaches with current industry standards
   - Discover solutions to similar problems

3. **Continuous Processing** (After Each Search)
   - Integrate new information immediately
   - Refine understanding progressively
   - Avoid information overload

4. **Final Synthesis**
   - Combine all findings
   - Create comprehensive solution
   - Ensure nothing is missed

**The Distributed Thinking Pattern:**
```
Think → Search → Think → Search → Think → Synthesize → Implement
```

**Benefits:**
✅ Every response informed by latest developments
✅ Solutions reflect current best practices
✅ Edge cases discovered through research
✅ Alternative approaches considered
✅ Implementation decisions backed by data
✅ Reduced risk of outdated approaches

**Integration with Deep Thinking:**
- **Deep Thinking** = Internal reasoning and analysis
- **MCP Analysis** = External context and verification
- **Combined** = Superior, well-informed solutions

## Maintenance

These rules should be updated when:
- Project structure changes significantly
- New technologies or libraries are added
- Coding standards evolve
- Design system is updated
- Testing protocols change
- Thinking process can be improved

---

**Created**: October 7, 2025
**Last Updated**: October 8, 2025
**Project**: Bimarz VPN Landing Page
**Purpose**: Comprehensive AI assistance for development, testing, and maintenance

