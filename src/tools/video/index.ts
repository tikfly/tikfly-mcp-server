import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetVideoDetail } from "./get-video-detail.js";
import { registerGetVideoComments } from "./get-video-comments.js";
import { registerGetVideoCommentReplies } from "./get-video-comment-replies.js";

export function registerVideoTools(server: McpServer) {
  registerGetVideoDetail(server);
  registerGetVideoComments(server);
  registerGetVideoCommentReplies(server);
}
