# Git Configuration for huuthangntk Account

This document outlines the git configuration to ensure all pushes use the huuthangntk GitHub account without prompting for account selection.

## Global Configuration

The following git configurations have been set globally:

```bash
# Set default credential username
git config --global credential.username huuthangntk

# Set GitHub-specific username
git config --global credential.https://github.com.username huuthangntk

# Disable GUI prompts for credentials
git config --global credential.guiPrompt false

# Use Git Credential Manager
git config --global credential.helper manager

# Always inject username into GitHub URLs
git config --global url."https://huuthangntk@github.com/".insteadOf "https://github.com/"
```

## Removed Credentials

The following credentials were removed from Windows Credential Manager to prevent account conflicts:

- Generic GitHub credential (https://github.com/)
- Generic git GitHub credential (git:https://github.com)
- elonmust12 GitHub account

## Result

With these configurations, git will:
1. Always use the huuthangntk account for GitHub operations
2. Not prompt for account selection via modal dialog
3. Automatically inject the username into all GitHub URLs
4. Use the stored credentials from Git Credential Manager

## Date Configured

October 8, 2025

