import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerUserTools } from "./user/index.js";
import { registerVideoTools } from "./video/index.js";
import { registerSearchTools } from "./search/index.js";
import { registerDownloadTools } from "./download/index.js";

export function registerTools(server: McpServer) {
  registerUserTools(server);
  registerVideoTools(server);
  registerSearchTools(server);
  registerDownloadTools(server);
}
