# Tikfly MCP Server

MCP Server for **[Tikfly](https://tikfly.io)** — Unofficial Tiktok API at scale without the usual limitations.

## Prerequisites

Subscribe to Tikfly and copy your API key:  
👉 https://docs.tikfly.io/getting-started/quickstart

## Install via Smithery (recommended)

> https://smithery.ai/servers/tikflydotio/tikfly-mcp

#### 1. Install Smithery CLI
```bash
npm install -g @smithery/cli@latest
```

#### 2. Create a namespace
```bash
smithery namespace create {your-namespace}
```

#### 3. Use this server

```bash
# Add this server
smithery mcp add tikflydotio/tikfly-mcp --headers '{"API-KEY":"YOUR-API-KEY"}'

# List available tools
smithery tool list {connection}

# Call a tool
smithery tool call {connection} {tool_name} '{"key": "value"}'
```

## Manual setup (Claude Desktop)

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tikfly": {
      "command": "npx",
      "args": ["-y", "tikfly-mcp"],
      "env": {
        "API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Available Tools

### User

| Tool | Description |
|------|-------------|
| `get_user_info` | Get TikTok user profile by username |
| `get_user_videos` | List videos posted by a user |
| `get_user_follower` | Get list of followers for a TikTok user |
| `get_user_following` | Get list of accounts a TikTok user is following |
| `get_user_story` | Get active stories of a TikTok user |

### Video

| Tool | Description |
|------|-------------|
| `get_video_detail` | Get detailed information of a TikTok video by video ID |
| `get_video_comments` | Get list of top-level comments on a TikTok video by video ID |
| `get_video_comment_replies` | Get reply comments for a specific comment on a TikTok video |

### Search

| Tool | Description |
|------|-------------|
| `search_videos` | Search TikTok videos by keyword |
| `search_accounts` | Search TikTok accounts (users) by keyword |
| `search_live` | Search TikTok live streams by keyword |

### Download

| Tool | Description |
|------|-------------|
| `download_user_videos` | Get downloadable videos from a specific TikTok user by their secUid |

## Example prompts

- *"Get TikTok profile info for @mrbeast"*
- *"List the 10 latest videos from @mrbeast"*
- *“Find TikTok videos about ‘chatgpt’, then fetch top comments for the first 3 videos”*
- *“Search accounts about ‘crypto’, then get their latest 5 videos”*
- *“Get followers of @mrbeast and analyze common patterns”*
- *“Fetch videos of @mrbeast and return only those with more than 1M likes”*
- *“Extract all comments from this video 7578547467189374239 for analysis”*

## Local development

```bash
npm install
npm run build
API_KEY=YOUR_API_KEY npx @modelcontextprotocol/inspector node dist/index.js
```
