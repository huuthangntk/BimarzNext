# Smithery.ai Documentation - Comprehensive Summary

## What is Smithery?

Smithery is the largest open marketplace for Model Context Protocol (MCP) servers, serving as a central hub where developers can discover, build, host, and deploy MCP-compliant servers. Think of it as the "npm registry" or "App Store" for AI agent capabilities. Smithery enables Large Language Models to connect with external services like GitHub, databases, Gmail, web browsers, and thousands of other tools through a standardized protocol.

## Core Concepts

### Model Context Protocol (MCP)

MCP is a universal standard that enables seamless communication between AI systems and external tools. It replaces ad-hoc integrations with a single, consistent protocol that allows LLMs to access external data sources, execute code, and interact with various services in a standardized way.

### Why Smithery Exists

The platform addresses three key challenges:

**Discovery** - Makes agentic services easy to find and explore in one central marketplace with over 7,000 available tools and integrations.

**Deployment** - Streamlines the integration process through automated hosting, containerization, and distribution of MCP servers.

**Standardization** - Empowers developers to build advanced AI workflows using a consistent protocol rather than custom integrations for each service.

## Building MCP Servers with Smithery

### Getting Started - The Quickstart Approach

Creating your first MCP server with Smithery is remarkably simple. The entire setup can be completed in just a few minutes using their CLI scaffold tool:

**Step 1: Initialize Project**
```bash
npm create smithery
```

This single command retrieves and executes the Create Smithery initializer package, setting up a complete TypeScript MCP server scaffold with example code and all necessary dependencies automatically installed.

**Step 2: Edit Your Server**

The scaffold creates a `src/index.ts` file with a working example server. Here's the basic structure you'll see:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export default function createServer({ config }) {
  const server = new McpServer({
    name: "Say Hello",
    version: "1.0.0",
  });

  // Add a tool
  server.registerTool("hello", {
    title: "Hello Tool",
    description: "Say hello to someone",
    inputSchema: {
      name: z.string().describe("Name to greet")
    },
  }, async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }],
  }));

  return server.server;
}
```

**Step 3: Test Locally**

```bash
npm run dev
```

This command port-forwards your local server to the Smithery Playground via ngrok, allowing you to test your server immediately by prompting something like "Say hello to Henry" in the playground interface.

**Step 4: Deploy**

Deployment is truly a one-click process. Simply push your code to a GitHub repository, then click the "Deploy" button on the Smithery home page to make your server available to the world.

### Deployment Patterns

Smithery supports three main deployment approaches to accommodate different development needs:

#### 1. TypeScript with Smithery CLI (Recommended)

This is the primary method that integrates directly with the official MCP TypeScript SDK. The Smithery CLI handles containerization and deployment automatically, making it the simplest path for TypeScript developers.

**Key Features:**
- Automatic schema extraction from Zod definitions
- Built-in esbuild configuration
- Hot reload development environment
- Seamless GitHub integration
- Automatic CORS and HTTP transport setup

#### 2. Python with FastMCP and Custom Containers

For Python developers, Smithery supports custom Docker containers using the FastMCP framework. This gives you full control over your Python environment while still benefiting from Smithery's hosting infrastructure.

**Example Python Server:**

```python
import os
import uvicorn
from mcp.server.fastmcp import FastMCP
from starlette.middleware.cors import CORSMiddleware

# Initialize MCP server
mcp = FastMCP(name="Say Hello")

@mcp.tool()
def say_hello(name: str) -> str:
    """Say hello to someone"""
    return f"Hello, {name}!"

def main():
    app = mcp.streamable_http_app()
    
    # IMPORTANT: Add CORS middleware for browser-based clients
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
        expose_headers=["mcp-session-id", "mcp-protocol-version"],
        max_age=86400,
    )
    
    # Get port from environment variable (Smithery sets this to 8081)
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()
```

**Critical Requirement:** Your server must listen on the configurable `PORT` environment variable. Smithery sets this to 8081 when deployed.

#### 3. Custom Containers (Any Language)

The Docker container approach works with any programming language including Go, Rust, Java, C#, or any other language of your choice. You define your build process in a Dockerfile and configure it through the `smithery.yaml` file.

### Configuration System

#### Session Configuration

One of Smithery's most powerful features is the ability to define session-specific configurations. This allows users to customize server behavior by providing API keys, adjusting settings, or modifying operational parameters for each connection.

**TypeScript Configuration Schema:**

```typescript
import { z } from "zod";

export const configSchema = z.object({
  apiKey: z.string().describe("Your API key"),
  modelName: z.string().default("gpt-4").describe("Model to use"),
  temperature: z.number().min(0).max(1).default(0.7).describe("Temperature setting"),
  options: z.object({
    timeout: z.number().default(5000),
    retries: z.number().default(3)
  }).optional()
});
```

When you provide a configuration schema, Smithery automatically generates a user-friendly configuration UI with appropriate form elements like text inputs, dropdowns, checkboxes, and number fields. The descriptions you provide appear as form labels and helpful tooltips.

**Python Configuration Schema:**

```python
from pydantic import BaseModel, Field

class ServerConfig(BaseModel):
    api_key: str = Field(description="Your API key")
    model_name: str = Field(default="gpt-4", description="Model to use")
    temperature: float = Field(default=0.7, ge=0, le=1, description="Temperature setting")
```

Configuration is passed to your server through URL parameters using dot notation, such as `?apiKey=xxx&model.name=gpt-4`. For custom containers, you define the schema manually in your `smithery.yaml` file.

#### Project Configuration - smithery.yaml

The `smithery.yaml` file serves as the central configuration for your MCP server deployment. Here's a comprehensive example:

```yaml
runtime: "container"  # or "typescript" for CLI-based deployments

build:
  dockerfile: "Dockerfile"
  dockerBuildPath: "."

startCommand:
  type: "http"  # or "stdio" for command-line execution
  
# For stdio servers
commandFunction: |
  (config) => ({
    command: "node",
    args: ["dist/index.js"],
    env: {
      API_KEY: config.apiKey,
      NODE_ENV: "production"
    }
  })

# Configuration schema for custom containers
configSchema:
  type: "object"
  properties:
    apiKey:
      type: "string"
      description: "Your API key"
    modelName:
      type: "string"
      default: "gpt-4"
      description: "Model to use"
```

#### Advanced Build Configuration - smithery.config.js

For TypeScript projects using the CLI, you can customize the build process using a `smithery.config.js` file in your project root:

```javascript
export default {
  esbuild: {
    // Mark problematic packages as external (avoid bundling issues)
    external: ["playwright-core", "puppeteer-core"],
    
    // Enable minification for production
    minify: true,
    
    // Set Node.js target version
    target: "node18"
  }
}
```

This is particularly useful for marking packages as external to avoid bundling issues with binary dependencies, configuring minification, and setting specific Node.js target versions.

## Transport Types

Smithery supports three transport mechanisms for MCP servers:

### 1. stdio (Standard Input/Output)

This transport runs locally on the user's machine. The server communicates through standard input and output streams, making it ideal for command-line tools and local integrations.

**Characteristics:**
- Execution environment: Local machine
- Deployment: Managed by the MCP client (like Cursor)
- Users: Single user
- Authentication: Manual token management
- Security: Highest security since everything runs locally

### 2. SSE (Server-Sent Events)

SSE enables real-time server-to-client streaming over HTTP. The server can push updates to connected clients as they occur.

**Characteristics:**
- Execution environment: Can be local or remote
- Deployment: Hosted as a server
- Users: Supports multiple concurrent users
- Authentication: OAuth support
- Use case: Real-time notifications and streaming data

### 3. Streamable HTTP

This is Smithery's primary recommended transport. It provides full HTTP-based communication with support for streaming responses, making it ideal for production deployments.

**Characteristics:**
- Execution environment: Remote hosting
- Deployment: Fully managed by Smithery
- Users: Scales to many concurrent users
- Authentication: OAuth support with automatic token handling
- Use case: Production-ready deployments with broad accessibility

## Testing and Development

### Local Development Workflow

The Smithery CLI provides an excellent development experience with hot reload capabilities:

```bash
# Start development server with ngrok tunneling
npm run dev

# This automatically:
# 1. Builds your TypeScript code
# 2. Starts your MCP server locally
# 3. Creates an ngrok tunnel
# 4. Opens the Smithery playground
# 5. Watches for file changes and reloads
```

### Interactive Playground Testing

Smithery provides an interactive playground where you can test your MCP server in real-time. You can use either the hosted playground (during `npm run dev`) or run it locally:

```bash
# Using npx (no installation needed)
npx -y @smithery/cli playground --port 8080

# Or install globally
npm install -g @smithery/cli
smithery playground --port 8080
```

The playground allows you to send prompts to your server, see the tools being called, inspect request/response payloads, and verify that everything works as expected before deploying.

### Smithery CLI Commands

The CLI provides several useful commands for development and debugging:

```bash
# Build your project
smithery build

# Start development server
smithery dev

# Open playground for testing
smithery playground --port 8080

# Deploy to Smithery (through UI is recommended)
# Visit smithery.ai/new and connect your GitHub repo
```

## Registry and Discovery

### Registry API

Smithery provides a programmatic Registry API for searching and discovering MCP servers. This is useful if you're building tools that need to integrate with multiple MCP servers dynamically.

**Authentication:**

All registry API endpoints require authentication via a bearer token. You can create an API key at the Smithery dashboard.

```javascript
const apiKey = 'your-smithery-api-token';

const response = await fetch('https://registry.smithery.ai/servers', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Accept': 'application/json'
  }
});
```

**Search Servers:**

The registry uses semantic search, meaning you can search using natural language queries:

```javascript
const query = 'owner:mem0ai is:verified memory';
const encodedQuery = encodeURIComponent(query);

const response = await fetch(
  `https://registry.smithery.ai/servers?q=${encodedQuery}&page=1&pageSize=10`,
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    }
  }
);

const data = await response.json();
// Returns: { servers: [...], pagination: {...} }
```

**Advanced Search Filters:**

The search API supports powerful filtering capabilities:

- `owner:username` - Filter by server owner
- `is:verified` - Show only verified servers
- `is:deployed` - Show only deployed servers
- Combine multiple filters together for precise results

**Get Server Details:**

Retrieve comprehensive information about a specific server:

```javascript
const qualifiedName = "mem0ai/mem0-mcp-server";

const response = await fetch(
  `https://registry.smithery.ai/servers/${qualifiedName}`,
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    }
  }
);

const serverData = await response.json();
```

The response includes connection details, security information from Invariant scanning (checking for tool poisoning, rug pulls, cross-origin escalations, and prompt injection attacks), available tools, and complete metadata.

## Security and Data Privacy

### Smithery's Security Model

Smithery takes security and privacy seriously with several key protections:

**Token Handling:**

When you install an MCP server locally via the Smithery CLI, configuration arguments (including API tokens) are marked as "ephemeral" and not stored on Smithery's servers according to their data policy. The best practice is to store tokens in local environment variables and never paste them into web forms.

**Local vs Hosted Execution:**

- **Local MCP:** You have full control, tokens remain on your machine, minimal data footprint on Smithery's side (only usage statistics)
- **Hosted MCP:** The server runs in Smithery's environment, so they see call metadata, but they claim to discard actual tokens and request details

**Security Scanning:**

Smithery uses Invariant to automatically scan all deployed servers for:
- Tool poisoning attacks
- Rug pulls (malicious updates)
- Cross-origin security escalations
- Prompt injection vulnerabilities

This security information is displayed prominently on each server's page and included in the Registry API responses.

**Anonymous Usage Tracking:**

Smithery logs usage counts for hosted MCP servers (how many times tools are called) but the actual data of your requests should remain ephemeral per their policy. However, you should always verify with each server's own documentation for specific data handling practices.

### Best Security Practices

When building and deploying MCP servers:

1. **Environment Variables:** Always use environment variables for sensitive data, never hardcode secrets
2. **Minimal Scopes:** Request only the minimum necessary permissions for API tokens
3. **Token Rotation:** Regularly rotate tokens and revoke unused ones
4. **Local Development:** Test with development/staging environments before using production data
5. **Review Tool Calls:** Always review what data is being sent to MCP tools, especially with production data

## Profiles and Authentication

### Configuration Profiles

Smithery's profile system allows you to save default configurations that apply across multiple MCP server connections. This is particularly useful when you're connecting to many different servers and don't want to specify configurations repeatedly.

**How Profiles Work:**

Instead of specifying your API key every time you connect to an MCP WebSocket server, you can create a profile on Smithery and perform an authenticated call by specifying a header. The saved configuration fields then act as default fallbacks, though you can still pass configuration fields when connecting to overwrite the defaults.

**Example Without Profile:**

```typescript
const transport = createTransport(
  "https://server.smithery.ai/@smithery-ai/github",
  { "githubPersonalAccessToken": "YOUR_GITHUB_PAT" },
  "YOUR_SMITHERY_API_KEY"
)
```

**Example With Profile:**

Once a profile is configured, the API key is automatically applied and you no longer need to pass it explicitly in your connection code.

### OAuth Authentication

Smithery supports OAuth authentication for MCP servers that require it. This enables secure access to external services without manually managing tokens. The platform handles the OAuth flow, token refresh, and secure storage automatically.

**Proxy OAuth Provider Example:**

```typescript
import express from 'express';
import { ProxyOAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/providers/proxyProvider.js';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';

const app = express();

const proxyProvider = new ProxyOAuthServerProvider({
  endpoints: {
    authorizationUrl: "https://auth.external.com/oauth2/v1/authorize",
    tokenUrl: "https://auth.external.com/oauth2/v1/token",
    revocationUrl: "https://auth.external.com/oauth2/v1/revoke",
  },
  verifyAccessToken: async (token) => {
    return {
      token,
      clientId: "123",
      scopes: ["openid", "email", "profile"],
    }
  },
  getClient: async (client_id) => {
    return {
      client_id,
      redirect_uris: ["http://localhost:3000/callback"],
    }
  }
});

app.use(mcpAuthRouter({
  provider: proxyProvider,
  issuerUrl: new URL("http://auth.external.com"),
  baseUrl: new URL("http://mcp.example.com"),
  serviceDocumentationUrl: new URL("https://docs.example.com/"),
}));
```

## External MCPs

If you're self-hosting your MCP server and only need listing and distribution on Smithery without using their hosting, you can publish an "external MCP" by providing a URL. This allows your server to appear in the Smithery registry and be discoverable while you maintain complete control over hosting and deployment.

**Requirements for External MCPs:**

Your self-hosted MCP must expose a `.well-known/mcp-config` endpoint that returns the configuration schema in JSON Schema format. This allows Smithery to generate the configuration UI and properly document your server's capabilities.

## Popular MCP Servers on Smithery

Smithery hosts thousands of MCP servers across various categories. Here are some notable examples:

**Official Integrations:**
- Browserbase: Automate browser interactions in the cloud
- Cloudflare: Deploy and manage Cloudflare resources
- Neon: Interact with Neon serverless Postgres
- Neo4j: Graph database operations
- Qdrant: Vector search and semantic memory
- Axiom: Query and analyze logs and traces

**Community Servers:**
- GitHub: Repository management and operations
- Google Calendar: Schedule management
- Google Tasks: Task management
- Playwright: Browser automation and web scraping
- Docker: Container management
- Elasticsearch: Search and analytics
- AWS S3: Cloud storage operations
- Airtable: Database access
- Slack: Workspace communication
- Notion: Workspace collaboration

**Development Tools:**
- Context7: Reference latest SDK docs directly in your editor
- Docs MCP: Index and search 3rd party documentation
- Package Docs: Access Go, Python, and NPM documentation

## Key Takeaways

Smithery represents a fundamental shift in how developers build and deploy AI agent capabilities. By providing a standardized marketplace with automated deployment, security scanning, and discovery features, it dramatically lowers the barrier to extending LLM capabilities with external tools and data sources.

The platform's strength lies in its developer-first approach: from the simple `npm create smithery` command that scaffolds a complete project, to the automated containerization and one-click deployment, everything is designed to minimize friction and maximize productivity.

Whether you're building a simple tool for personal use or deploying production-grade integrations for thousands of users, Smithery provides the infrastructure, tooling, and marketplace to make it happen efficiently and securely.

For the latest updates and community engagement, follow Henry Mao (Smithery's creator) on X, join their Discord for support, or visit the GitHub organization at github.com/smithery-ai for open-source components and reference implementations.