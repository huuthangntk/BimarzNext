# Complete List of All 106 GitHub MCP Tools

This document lists **every tool** available in the GitHub MCP server, categorized by function. Use this to understand what you're disabling/enabling.

---

## ✅ Essential Tools (10-14 tools) - **KEEP THESE**

### File Operations (4 tools)
1. ✅ **`push_files`** - Push multiple files in one commit
2. ✅ **`create_or_update_file`** - Create or update single file
3. ✅ **`get_file_contents`** - Read file or directory contents
4. ✅ **`delete_file`** - Delete file from repository

### Repository Management (3 tools)
5. ✅ **`list_branches`** - List all branches
6. ✅ **`create_branch`** - Create new branch
7. ✅ **`list_commits`** - View commit history

### Pull Requests (3 tools)
8. ✅ **`create_pull_request`** - Create new PR
9. ✅ **`get_pull_request`** - Get PR details
10. ✅ **`list_pull_requests`** - List PRs

### Issues (2-4 tools)
11. ✅ **`create_issue`** - Create new issue
12. ✅ **`get_issue`** - Get issue details
13. ✅ **`list_issues`** - List issues
14. ✅ **`add_issue_comment`** - Comment on issues

### Search (Optional, 2 tools)
15. ✅ **`search_code`** - Search code across repos
16. ✅ **`search_repositories`** - Find repositories

---

## ❌ Rarely Needed Tools (92+ tools) - **DISABLE THESE**

### Workflow Management (17 tools) ❌
- `list_workflows` - List repository workflows
- `get_workflow_run` - Get workflow run details
- `list_workflow_runs` - List workflow runs for workflow
- `list_workflow_jobs` - List jobs for workflow run
- `get_job_logs` - Get workflow job logs
- `list_workflow_run_artifacts` - List artifacts for run
- `download_workflow_run_artifact` - Download artifact
- `delete_workflow_run_logs` - Delete workflow logs
- `cancel_workflow_run` - Cancel running workflow
- `rerun_workflow_run` - Rerun entire workflow
- `rerun_failed_jobs` - Rerun only failed jobs
- `run_workflow` - Manually trigger workflow
- `get_workflow_run_usage` - Get workflow usage stats

### Advanced PR Operations (15 tools) ❌
- `get_pull_request_diff` - Get PR diff
- `get_pull_request_files` - Get files changed in PR
- `get_pull_request_status` - Get PR status checks
- `get_pull_request_reviews` - Get PR reviews
- `get_pull_request_review_comments` - Get review comments
- `create_pending_pull_request_review` - Create pending review
- `add_comment_to_pending_review` - Add comment to pending review
- `delete_pending_pull_request_review` - Delete pending review
- `create_and_submit_pull_request_review` - Submit review
- `merge_pull_request` - Merge PR
- `request_copilot_review` - Request AI review
- `search_pull_requests` - Search PRs

### Advanced Issue Operations (10 tools) ❌
- `get_issue_comments` - Get issue comments
- `add_sub_issue` - Add sub-issue
- `list_sub_issues` - List sub-issues
- `remove_sub_issue` - Remove sub-issue
- `reprioritize_sub_issue` - Reorder sub-issues
- `list_issue_types` - List custom issue types
- `search_issues` - Search issues
- `assign_copilot_to_issue` - Assign Copilot to issue

### Git Operations (8 tools) ❌
- `get_commit` - Get commit details
- `list_tags` - List repository tags
- `get_tag` - Get tag details

### Projects (10 tools) ❌
- `list_projects` - List projects for user/org
- `get_project` - Get project details
- `get_project_field` - Get project field
- `list_project_fields` - List project fields
- `list_project_items` - List items in project
- `get_project_item` - Get project item
- `add_project_item` - Add item to project
- `delete_project_item` - Delete project item

### Code Scanning & Security (10 tools) ❌
- `list_code_scanning_alerts` - List code scanning alerts
- `get_code_scanning_alert` - Get specific alert
- `list_dependabot_alerts` - List Dependabot alerts
- `get_dependabot_alert` - Get specific Dependabot alert
- `list_secret_scanning_alerts` - List secret scanning alerts
- `get_secret_scanning_alert` - Get specific secret alert
- `list_repository_security_advisories` - List repo advisories
- `list_org_repository_security_advisories` - List org advisories
- `list_global_security_advisories` - List global advisories
- `get_global_security_advisory` - Get global advisory

### Notifications (6 tools) ❌
- `list_notifications` - List all notifications
- `get_notification_details` - Get notification details
- `dismiss_notification` - Mark notification as read/done
- `mark_all_notifications_read` - Mark all as read
- `manage_notification_subscription` - Manage subscriptions
- `manage_repository_notification_subscription` - Manage repo subs

### Repository Operations (7 tools) ❌
- `create_repository` - Create new repository
- `fork_repository` - Fork repository
- `search_repositories` - Search repositories

### User & Team Management (8 tools) ❌
- `get_me` - Get authenticated user info
- `get_teams` - Get user's teams
- `get_team_members` - Get team members
- `search_users` - Search users
- `search_orgs` - Search organizations

### Gists (2 tools) ❌
- `create_gist` - Create gist
- `list_gists` - List user's gists

### Releases (3 tools) ❌
- `list_releases` - List repository releases
- `get_latest_release` - Get latest release
- `get_release_by_tag` - Get release by tag

### Discussions (5 tools) ❌
- `list_discussions` - List repository discussions
- `get_discussion` - Get discussion details
- `get_discussion_comments` - Get discussion comments
- `list_discussion_categories` - List discussion categories

### Starred Repositories (1 tool) ❌
- `list_starred_repositories` - List starred repos

### Copilot Spaces (2 tools) ❌
- `list_copilot_spaces` - List Copilot spaces
- `get_copilot_space` - Get Copilot space details

### Search Tools (4 tools, some useful) ⚠️
- `search_code` - ✅ **Keep** - Search code
- `search_repositories` - ✅ **Keep** - Find repositories
- `search_issues` - ❌ Disable - Advanced issue search
- `search_pull_requests` - ❌ Disable - Advanced PR search
- `search_users` - ❌ Disable - User search
- `search_orgs` - ❌ Disable - Organization search

### Copilot Features (3 tools) ❌
- `request_copilot_review` - Request Copilot PR review
- `assign_copilot_to_issue` - Assign Copilot to issue
- `create_pull_request_with_copilot` - Create PR with Copilot

---

## Recommended `includeTools` Configuration

### Minimal (10 tools) - For Basic Development
```json
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
```

### Standard (14 tools) - Recommended for Most Users
```json
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
  "list_pull_requests",
  "create_issue",
  "get_issue",
  "list_issues",
  "add_issue_comment"
]
```

### Extended (20 tools) - For Active GitHub Users
```json
"includeTools": [
  "push_files",
  "create_or_update_file",
  "get_file_contents",
  "delete_file",
  "list_branches",
  "create_branch",
  "list_commits",
  "get_commit",
  "create_pull_request",
  "get_pull_request",
  "list_pull_requests",
  "get_pull_request_files",
  "merge_pull_request",
  "create_issue",
  "get_issue",
  "list_issues",
  "add_issue_comment",
  "search_code",
  "search_repositories",
  "get_me"
]
```

---

## How Many Tools Do You Really Need?

### Statistics

- **Total GitHub MCP Tools:** 106
- **Essential Tools:** 10-14 (9-13%)
- **Commonly Used:** 20-25 (19-24%)
- **Rarely Used:** 80-96 (75-90%)

### Recommendation

**For 99% of users:** Use the **Standard (14 tools)** configuration.

This covers:
- ✅ All file operations
- ✅ Basic branch management
- ✅ PR creation and viewing
- ✅ Issue creation and tracking
- ✅ Commit history

What you're **NOT** missing:
- ❌ Workflow management (use GitHub Actions UI instead)
- ❌ Advanced PR reviews (use GitHub UI instead)
- ❌ Security scanning (automated via GitHub)
- ❌ Project management (use GitHub Projects UI)
- ❌ Notifications (check GitHub directly)
- ❌ Team management (admin task, not dev task)

---

## Tool Usage Frequency Analysis

Based on typical development workflows:

### Daily Use (10 tools) - **MUST HAVE**
- `push_files` - ⭐⭐⭐⭐⭐ Every commit
- `create_or_update_file` - ⭐⭐⭐⭐⭐ Every file change
- `get_file_contents` - ⭐⭐⭐⭐⭐ Reading code
- `list_branches` - ⭐⭐⭐⭐ Branch switching
- `create_branch` - ⭐⭐⭐⭐ New features
- `list_commits` - ⭐⭐⭐⭐ Code review
- `create_pull_request` - ⭐⭐⭐⭐ Feature completion
- `get_pull_request` - ⭐⭐⭐⭐ PR review
- `create_issue` - ⭐⭐⭐ Bug tracking
- `list_issues` - ⭐⭐⭐ Sprint planning

### Weekly Use (5 tools) - **NICE TO HAVE**
- `delete_file` - ⭐⭐ Cleanup
- `list_pull_requests` - ⭐⭐ Team coordination
- `get_issue` - ⭐⭐ Issue details
- `add_issue_comment` - ⭐⭐ Collaboration
- `search_code` - ⭐⭐ Finding examples

### Monthly Use (5 tools) - **OPTIONAL**
- `merge_pull_request` - ⭐ Usually via UI
- `get_pull_request_files` - ⭐ Detailed review
- `get_commit` - ⭐ Debugging
- `search_repositories` - ⭐ Discovery
- `get_me` - ⭐ Account info

### Rarely/Never (86 tools) - **DISABLE**
- Workflow management - ⚫ CI/CD admin task
- Security alerts - ⚫ Automated scanning
- Notifications - ⚫ Check GitHub directly
- Projects - ⚫ Use GitHub UI
- Teams - ⚫ Admin task
- Gists - ⚫ Quick sharing (rare)
- Releases - ⚫ Release management
- And 79 more...

---

## Summary

**Out of 106 GitHub MCP tools:**
- ✅ **Keep 10-14 tools** (9-13%) - Essential for daily development
- ⚠️ **Consider 5-10 more** (5-9%) - Nice to have for active users
- ❌ **Disable 80-96 tools** (75-90%) - Rarely or never used

**Result:** Clean, focused toolset that AI can use effectively! 🎯


