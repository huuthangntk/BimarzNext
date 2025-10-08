# GitHub MCP Configuration & Troubleshooting Guide

## Problem 1: GitHub Push Fails with 403 Error

### Root Cause
The GitHub Personal Access Token (PAT) configured for the GitHub MCP server **lacks write permissions**. The error `403 Resource not accessible by personal access token` indicates the token is read-only.

### Solution: Create a New GitHub PAT with Proper Permissions

#### Step 1: Generate New Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name: `Cursor MCP - Full Access`
4. Set expiration (recommended: 90 days or 1 year)
5. **Select these scopes:**
   - ✅ **`repo`** (Full control of private repositories) - **THIS IS CRITICAL**
     - Includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - ✅ **`workflow`** (Update GitHub Action workflows) - Optional but useful
   - ✅ **`read:org`** (Read org and team membership) - If working with organizations
   - ✅ **`gist`** (Create gists) - Optional
6. Click **"Generate token"**
7. **COPY THE TOKEN IMMEDIATELY** - You won't see it again!

#### Step 2: Update MCP Configuration

Cursor stores MCP configuration in **Settings**. To update:

**Method 1: Via Cursor Settings UI**
1. Open Cursor
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "MCP" and select **"MCP: Configure Servers"**
4. Find the GitHub MCP server configuration
5. Update the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable with your new token
6. Restart Cursor

**Method 2: Via Configuration File**

The configuration location depends on your setup, but typically:

**Windows:**
- `%APPDATA%\Cursor\User\globalStorage\cursor-mcp\mcp-config.json`
- Or via Cursor Settings UI (recommended)

**Mac:**
- `~/Library/Application Support/Cursor/User/globalStorage/cursor-mcp/mcp-config.json`

**Linux:**
- `~/.config/Cursor/User/globalStorage/cursor-mcp/mcp-config.json`

Update the GitHub server configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_NEW_TOKEN_HERE"
      }
    }
  }
}
```

**Or if using Docker:**

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_NEW_TOKEN_HERE"
      }
    }
  }
}
```

#### Step 3: Verify Token Works

Test the token:

```bash
# Using curl
curl -H "Authorization: Bearer ghp_YOUR_TOKEN" https://api.github.com/repos/huuthangntk/bimarz-vpn-landing

# Should return repository information without 403 error
```

---

## Problem 2: GitHub MCP Has 106 Tools (Too Many!)

### The Issue
GitHub MCP server provides **106 tools**, but you realistically only need **5-10 essential tools** for typical development workflows. Having too many tools:
- Clutters the AI's context
- Increases latency
- Makes it harder for AI to choose the right tool
- Wastes token budget

### Essential Tools to Keep (Top 10)

Here are the **must-have tools** for most workflows:

#### File Operations (4 tools)
1. **`push_files`** - Push multiple files in single commit (MOST IMPORTANT)
2. **`create_or_update_file`** - Create or update single file
3. **`get_file_contents`** - Read file contents
4. **`delete_file`** - Delete files

#### Repository Operations (3 tools)
5. **`list_branches`** - List all branches
6. **`create_branch`** - Create new branch
7. **`list_commits`** - View commit history

#### PR & Issues (3 tools)
8. **`create_pull_request`** - Create PRs
9. **`get_pull_request`** - Get PR details
10. **`create_issue`** - Create issues

### Tools to Disable (96 tools)

All other tools are rarely needed for typical development:

#### Low Priority Tools
- Workflow management (cancel, rerun workflows)
- Advanced PR operations (reviews, comments, merges)
- Project management (projects, milestones)
- Security alerts (code scanning, dependabot, secrets)
- Advanced git operations (tags, releases, gists)
- Team management
- Discussions
- Notifications
- Fork management
- And 80+ more...

### Solution: Whitelist Only Essential Tools

Use the **`includeTools`** configuration to whitelist only the tools you need:

#### Recommended Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_NEW_TOKEN_HERE"
      },
      "includeTools": [
        "push_files",
        "create_or_update_file",
        "get_file_contents",
        "delete_file",
        "list_branches",
        "create_branch",
        "list_commits",
        "create_pull_request",
        "get_pull_request",
        "create_issue"
      ]
    }
  }
}
```

#### Alternative: Exclude Specific Tools

If you prefer to exclude specific tools instead:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_NEW_TOKEN_HERE"
      },
      "excludeTools": [
        "cancel_workflow_run",
        "delete_workflow_run_logs",
        "dismiss_notification",
        "fork_repository",
        "create_gist",
        "request_copilot_review",
        "add_sub_issue",
        "remove_sub_issue"
        // Add 90+ more tools to exclude...
      ]
    }
  }
}
```

**Note:** `includeTools` is **much simpler** and more maintainable than `excludeTools` for this use case!

---

## Complete Fixed Configuration

Here's the **complete, production-ready configuration** with both fixes applied:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_NEW_TOKEN_WITH_REPO_SCOPE"
      },
      "includeTools": [
        "push_files",
        "create_or_update_file",
        "get_file_contents",
        "delete_file",
        "list_branches",
        "create_branch",
        "list_commits",
        "create_pull_request",
        "get_pull_request",
        "create_issue",
        "get_issue",
        "list_issues",
        "search_code",
        "search_repositories"
      ],
      "timeout": 30000,
      "disabled": false
    }
  }
}
```

---

## How to Apply This Configuration in Cursor

### Option 1: Via Cursor Settings UI (Recommended)

1. **Open Cursor**
2. Press **`Ctrl+,`** (or `Cmd+,` on Mac) to open Settings
3. Search for **"MCP"** in the search bar
4. Click **"Edit in settings.json"** or **"Configure MCP Servers"**
5. Update/add the GitHub MCP configuration shown above
6. **Save** the file
7. **Restart Cursor** for changes to take effect

### Option 2: Direct File Edit

1. Locate your Cursor settings directory:
   - **Windows:** `%APPDATA%\Cursor\User`
   - **Mac:** `~/Library/Application Support/Cursor/User`
   - **Linux:** `~/.config/Cursor/User`

2. Open `settings.json` or the MCP configuration file

3. Add/update the `mcpServers` section with the configuration above

4. Save and restart Cursor

### Option 3: Command Palette

1. Press **`Ctrl+Shift+P`** (or `Cmd+Shift+P`)
2. Type **"MCP: Configure Servers"**
3. Select the command
4. Edit the configuration that opens
5. Save and restart

---

## Verification Steps

### 1. Verify Token Permissions

```bash
# Test API access
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user

# Should return your user info without errors
```

### 2. Verify MCP Configuration

After restarting Cursor, test pushing files:

```typescript
// In Cursor chat, try:
mcp_github_push_files({
  owner: "huuthangntk",
  repo: "bimarz-vpn-landing",
  branch: "main",
  files: [{
    path: "test.txt",
    content: "Test push with new config"
  }],
  message: "test: verify GitHub MCP configuration"
})
```

If successful, you should see commit created without 403 error!

### 3. Verify Tool Filtering

Check MCP logs to confirm only whitelisted tools are loaded:

**Windows:** `C:\Users\Yomen\AppData\Roaming\Cursor\logs\<date>\window2\exthost\anysphere.cursor-mcp\MCP user-GitHub.log`

Look for lines like:
```
[INFO] Loaded 14 tools from GitHub MCP
[INFO] Available tools: push_files, create_or_update_file, get_file_contents, ...
```

Should show **~14 tools** instead of 106!

---

## Benefits of This Configuration

✅ **GitHub pushes work** - Token has write permissions  
✅ **Only 14 tools instead of 106** - 86% reduction!  
✅ **Faster AI responses** - Less context to process  
✅ **More accurate tool selection** - AI not confused by 100+ options  
✅ **Lower token usage** - Smaller tool definitions  
✅ **Cleaner MCP logs** - Only relevant tools shown  

---

## Troubleshooting

### Issue: Still Getting 403 Error

**Check:**
1. Token has `repo` scope enabled
2. Token is not expired
3. Token is correctly set in MCP configuration
4. Restarted Cursor after updating
5. Repository exists and you have access

**Solution:** Generate a completely new token following Step 1 above.

### Issue: includeTools Not Working

**Check:**
1. Configuration syntax is correct (proper JSON)
2. Cursor restarted after config change
3. Using latest version of `@modelcontextprotocol/server-github`

**Solution:** Try updating the GitHub MCP server:
```bash
npx -y @modelcontextprotocol/server-github@latest
```

### Issue: Configuration File Not Found

**Solution:** Create it via Cursor UI:
1. `Ctrl+Shift+P` → "MCP: Configure Servers"
2. If prompted, allow Cursor to create configuration
3. Follow Option 1 above

---

## Additional Resources

- [GitHub Personal Access Token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [MCP Server Configuration Guide](https://docs.cursor.com/mcp)
- [GitHub MCP Server Repository](https://github.com/github/github-mcp-server)

---

## Summary

**Two fixes needed:**

1. **Fix 403 Error:** Create new GitHub PAT with `repo` scope
2. **Fix Tool Overload:** Use `includeTools` to whitelist only 10-14 essential tools

**Result:** GitHub pushes work perfectly, and AI has clean, focused set of tools! 🎉


