import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetVideoCommentReplies(server: McpServer) {
  server.tool(
    "get_video_comment_replies",
    "Get reply comments for a specific comment on a TikTok video. Supports pagination via cursor.",
    {
      videoId: z
        .string()
        .min(1)
        .describe("TikTok video ID"),
      commentId: z
        .string()
        .min(1)
        .describe("Comment ID to fetch replies for"),
      cursor: z
        .string()
        .optional()
        .describe("cursor parameter is used for pagination. In the first request, the default value of cursor is 0. For subsequent requests, the value of cursor will be taken from the response of the previous request"),
      count: z
        .string()
        .optional()
        .default("6")
        .describe("Number of replies to return (default and maximum value is 6)"),
    },
    async ({ videoId, commentId, cursor, count }) => {
      const data = await tikflyFetch("/api/post/comment/replies", {
        videoId,
        commentId,
        ...(cursor ? { cursor } : {}),
        count: count ?? "20",
      });
      return ok(data);
    }
  );
}