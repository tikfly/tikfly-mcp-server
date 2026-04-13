import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerDownloadUserVideos } from "./download-user-videos.js";

export function registerDownloadTools(server: McpServer) {
  registerDownloadUserVideos(server);
}
