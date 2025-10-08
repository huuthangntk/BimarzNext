# Complete Guide: Creating GitHub Repositories via REST API

## Understanding the Basics

The GitHub REST API allows you to programmatically create and manage repositories. This means you can automate repository creation, integrate it into your development workflows, or build tools that interact with GitHub directly.

## Prerequisites

Before you can create repositories via the API, you need:

1. **A GitHub Account** - Obviously required to create repositories
2. **Authentication Token** - GitHub requires authentication for repository creation
3. **Appropriate Permissions** - Your token needs the `repo` scope

## Step 1: Creating a Personal Access Token

To authenticate with the GitHub API, you'll need a Personal Access Token (PAT). Here's how to create one:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give your token a descriptive name (e.g., "Repository Creation Script")
4. Select the `repo` scope (this grants full control of private repositories)
5. Click "Generate token"
6. **Important**: Copy the token immediately - you won't be able to see it again!

## Step 2: Understanding the API Endpoint

GitHub provides two main endpoints for creating repositories:

- **User Repository**: `POST https://api.github.com/user/repos` (creates in your personal account)
- **Organization Repository**: `POST https://api.github.com/orgs/{org}/repos` (creates in an organization)

## Step 3: Repository Creation - Basic Example

Here's the most basic request structure:

### Using cURL (Command Line)

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/user/repos \
  -d '{
    "name": "my-new-repository",
    "description": "This is my awesome new repository",
    "private": false
  }'
```

### Using JavaScript (Node.js)

```javascript
async function createGitHubRepo() {
  const token = 'YOUR_TOKEN_HERE';
  
  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'my-new-repository',
      description: 'This is my awesome new repository',
      private: false
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create repository: ${error.message}`);
  }
  
  const data = await response.json();
  console.log('Repository created successfully!');
  console.log('URL:', data.html_url);
  return data;
}

// Usage
createGitHubRepo()
  .then(repo => console.log('Success!', repo))
  .catch(err => console.error('Error:', err));
```

### Using Python

```python
import requests
import json

def create_github_repo(token, repo_name, description, private=False):
    """
    Create a new GitHub repository using the REST API
    
    Args:
        token: Your GitHub Personal Access Token
        repo_name: Name of the repository to create
        description: Repository description
        private: Boolean - whether the repo should be private
    
    Returns:
        Response data containing repository information
    """
    url = 'https://api.github.com/user/repos'
    
    headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': f'Bearer {token}',
        'X-GitHub-Api-Version': '2022-11-28'
    }
    
    data = {
        'name': repo_name,
        'description': description,
        'private': private
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 201:
        repo_data = response.json()
        print(f"✓ Repository created successfully!")
        print(f"  URL: {repo_data['html_url']}")
        print(f"  Clone URL: {repo_data['clone_url']}")
        return repo_data
    else:
        print(f"✗ Failed to create repository")
        print(f"  Status: {response.status_code}")
        print(f"  Error: {response.json()}")
        return None

# Example usage
token = 'YOUR_TOKEN_HERE'
repo = create_github_repo(
    token=token,
    repo_name='my-awesome-project',
    description='An amazing project built with Python',
    private=False
)
```

## Step 4: Advanced Configuration Options

The GitHub API supports many additional parameters when creating a repository. Here's a comprehensive example:

```json
{
  "name": "advanced-repository",
  "description": "A repository with advanced configuration",
  "homepage": "https://example.com",
  "private": false,
  "has_issues": true,
  "has_projects": true,
  "has_wiki": true,
  "has_discussions": false,
  "auto_init": true,
  "gitignore_template": "Python",
  "license_template": "mit",
  "allow_squash_merge": true,
  "allow_merge_commit": true,
  "allow_rebase_merge": true,
  "allow_auto_merge": false,
  "delete_branch_on_merge": true,
  "is_template": false
}
```

### Parameter Explanations

- **name** (required): Repository name (letters, numbers, hyphens, underscores)
- **description**: Brief description shown on repository page
- **homepage**: Website URL for the project
- **private**: `true` for private, `false` for public repositories
- **has_issues**: Enable GitHub Issues feature
- **has_projects**: Enable GitHub Projects feature
- **has_wiki**: Enable repository wiki
- **has_discussions**: Enable GitHub Discussions
- **auto_init**: Automatically create initial commit with README
- **gitignore_template**: Add a `.gitignore` file (e.g., "Python", "Node", "Java")
- **license_template**: Add a license file (e.g., "mit", "apache-2.0", "gpl-3.0")
- **allow_squash_merge**: Allow squash merging pull requests
- **allow_merge_commit**: Allow regular merge commits
- **allow_rebase_merge**: Allow rebase merging
- **delete_branch_on_merge**: Automatically delete head branches after merge

## Step 5: Creating Organization Repositories

To create a repository under an organization, use a different endpoint:

```javascript
async function createOrgRepo(token, orgName, repoName) {
  const url = `https://api.github.com/orgs/${orgName}/repos`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: repoName,
      description: 'Organization repository',
      private: false,
      visibility: 'public' // Can be 'public', 'private', or 'internal'
    })
  });
  
  return await response.json();
}
```

## Step 6: Error Handling

Always implement proper error handling. Common errors include:

### Status Code 401 - Unauthorized
Your token is invalid or missing. Verify your token is correct and has the `repo` scope.

### Status Code 422 - Validation Failed
The repository name already exists, or parameters are invalid.

```javascript
async function createRepoWithErrorHandling(token, repoData) {
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(repoData)
    });
    
    const data = await response.json();
    
    switch (response.status) {
      case 201:
        console.log('✓ Success! Repository created:', data.html_url);
        return data;
        
      case 401:
        throw new Error('Authentication failed. Check your token.');
        
      case 422:
        const errors = data.errors?.map(e => e.message).join(', ') || data.message;
        throw new Error(`Validation failed: ${errors}`);
        
      case 403:
        throw new Error('Forbidden. You may have reached repository limits or lack permissions.');
        
      default:
        throw new Error(`Unexpected error (${response.status}): ${data.message}`);
    }
  } catch (error) {
    console.error('✗ Error creating repository:', error.message);
    throw error;
  }
}
```

## Step 7: Complete Working Example (Node.js)

Here's a production-ready script you can use:

```javascript
const https = require('https');

class GitHubRepoCreator {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.github.com';
  }
  
  async createRepository(options) {
    const {
      name,
      description = '',
      private: isPrivate = false,
      autoInit = false,
      gitignoreTemplate = null,
      licenseTemplate = null
    } = options;
    
    const repoData = {
      name,
      description,
      private: isPrivate,
      auto_init: autoInit
    };
    
    if (gitignoreTemplate) repoData.gitignore_template = gitignoreTemplate;
    if (licenseTemplate) repoData.license_template = licenseTemplate;
    
    const response = await fetch(`${this.baseUrl}/user/repos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'GitHub-Repo-Creator'
      },
      body: JSON.stringify(repoData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${data.message}`);
    }
    
    return {
      name: data.name,
      url: data.html_url,
      cloneUrl: data.clone_url,
      sshUrl: data.ssh_url,
      isPrivate: data.private,
      createdAt: data.created_at
    };
  }
}

// Usage example
async function main() {
  const creator = new GitHubRepoCreator('YOUR_TOKEN_HERE');
  
  try {
    const repo = await creator.createRepository({
      name: 'my-awesome-project',
      description: 'A project created via GitHub API',
      private: false,
      autoInit: true,
      gitignoreTemplate: 'Node',
      licenseTemplate: 'mit'
    });
    
    console.log('Repository created successfully!');
    console.log('Name:', repo.name);
    console.log('URL:', repo.url);
    console.log('Clone:', repo.cloneUrl);
  } catch (error) {
    console.error('Failed to create repository:', error.message);
  }
}

main();
```

## Best Practices

1. **Never hardcode tokens** - Use environment variables or secure credential storage
2. **Handle rate limits** - GitHub allows 5,000 requests per hour for authenticated users
3. **Use descriptive names** - Repository names should be clear and follow conventions
4. **Validate input** - Check repository names before making API calls
5. **Log responses** - Keep track of created repositories for audit purposes
6. **Use HTTPS** - Always use secure connections to the API

## Rate Limiting

GitHub enforces rate limits on API requests:

- **Authenticated requests**: 5,000 per hour
- **Check remaining limits** using response headers:
  - `X-RateLimit-Limit`: Maximum requests per hour
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

```javascript
async function checkRateLimit(token) {
  const response = await fetch('https://api.github.com/rate_limit', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    }
  });
  
  const data = await response.json();
  console.log('Core API Limit:', data.resources.core.limit);
  console.log('Remaining:', data.resources.core.remaining);
  console.log('Resets at:', new Date(data.resources.core.reset * 1000));
}
```

## Security Considerations

1. **Token Security**: Store tokens in environment variables, not in code
2. **Token Scope**: Use minimum necessary scopes (principle of least privilege)
3. **Token Rotation**: Regularly rotate tokens and revoke unused ones
4. **HTTPS Only**: Never send tokens over unencrypted connections
5. **Error Messages**: Don't expose tokens in error logs or messages

## Additional Resources

- GitHub REST API Documentation: https://docs.github.com/en/rest
- Personal Access Tokens Guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- Repository API Reference: https://docs.github.com/en/rest/repos/repos

Now you have everything you need to create GitHub repositories programmatically! Start with the basic examples and gradually incorporate more advanced features as you become comfortable with the API.