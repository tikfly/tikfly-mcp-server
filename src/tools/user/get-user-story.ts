import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetUserStory(server: McpServer) {
  server.tool(
    "get_user_story",
    `
      Get active stories of a TikTok user (by userId)

      IMPORTANT:
      This endpoint requires a numeric userId.
      If you only have a username (uniqueId), you MUST first call "get_user_info"
      to retrieve userId from the profile response before calling this tool.
    `,
    {
      userId: z
        .string()
        .min(1)
        .describe('TikTok numeric userId, e.g. "6803724582765200389"'),
      maxCursor: z
        .string()
        .optional()
        .default("0")
        .describe(
          "Pagination cursor. First request = '0'. Next requests use maxCursor returned from previous response."
        ),
    },
    async ({ userId, maxCursor }) => {
      const data = await tikflyFetch("/api/user/story", {
        userId,
        maxCursor: maxCursor ?? "0",
      });

      return ok(data);
    }
  );
}
