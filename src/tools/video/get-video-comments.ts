import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetVideoComments(server: McpServer) {
  server.tool(
    "get_video_comments",
    "Get list of top-level comments on a TikTok video by video ID. Supports pagination via cursor.",
    {
      videoId: z
        .string()
        .min(1)
        .describe("TikTok video ID, e.g. '7572198435487501598'"),
      cursor: z
        .string()
        .optional()
        .describe("Cursor parameter is used for pagination. In the first request, the default value of cursor is 0. For subsequent requests, the value of cursor will be taken from the response of the previous request"),
      count: z
        .string()
        .optional()
        .default("50")
        .describe("Number of comments to return (default and maximum value is 50)"),
    },
    async ({ videoId, cursor, count }) => {
      const data = await tikflyFetch("/api/post/comments", {
        videoId,
        ...(cursor ? { cursor } : {}),
        count: count ?? "20",
      });
      return ok(data);
    }
  );
}