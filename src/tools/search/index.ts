import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchVideos } from "./search-videos.js";
import { registerSearchAccounts } from "./search-accounts.js";
import { registerSearchLive } from "./search-live.js";

export function registerSearchTools(server: McpServer) {
  registerSearchVideos(server);
  registerSearchAccounts(server);
  registerSearchLive(server);
}
