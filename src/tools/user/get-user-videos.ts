import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetUserVideos(server: McpServer) {
  server.tool(
    "get_user_videos",
    `
      Get list of videos posted by a TikTok user.
      
      IMPORTANT:
      This endpoint requires secUid.
      If you only have a username, you MUST first call "get_user_info"
      to obtain secUid from the user profile.
    `,
    {
      secUid: z
        .string()
        .min(1)
        .describe("TikTok user secUid (from user profile)"),
      cursor: z
        .string()
        .optional()
        .describe("cursor parameter is used for pagination. In the first request, the default value of cursor is 0. For subsequent requests, the value of cursor will be taken from the response of the previous request"),
      count: z
        .string()
        .optional()
        .default("15")
        .describe("The number of results to be returned"),
    },
    async ({ secUid, cursor, count }) => {
      const data = await tikflyFetch("/api/user/posts", {
        secUid,
        ...(cursor ? { cursor } : {}),
        count: count ?? "15",
      });

      return ok(data);
    }
  );
}
