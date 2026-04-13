import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerDownloadUserVideos(server: McpServer) {
  server.tool(
    "download_user_videos",
    `
      Get downloadable videos from a specific TikTok user by their secUid.

      This tool returns a list of the user’s videos along with direct download information. It also supports cursor-based pagination to retrieve large video lists in multiple requests.
    `,
    {
      secUid: z
        .string()
        .min(1)
        .describe("TikTok user secUid (from user profile)"),
      minCursor: z
        .string()
        .optional()
        .describe("minCursor parameter is used for pagination. In the first request, the default value of minCursor is 0. For subsequent requests, the value of minCursor will be taken from the response of the previous request. Both minCursor and maxCursor must be provided to paginate in the next request."),
      maxCursor: z
        .string()
        .optional()
        .describe("maxCursor parameter is used for pagination. In the first request, the default value of maxCursor is 0. For subsequent requests, the value of maxCursor will be taken from the response of the previous request. Both minCursor and maxCursor must be provided to paginate in the next request."),
    },
    async ({ secUid, minCursor, maxCursor }) => {
      const data = await tikflyFetch("/api/download/user/video", {
        secUid,
        ...(minCursor ? { minCursor } : {}),
        ...(maxCursor ? { maxCursor } : {}),
      });
      return ok(data);
    }
  )
}
