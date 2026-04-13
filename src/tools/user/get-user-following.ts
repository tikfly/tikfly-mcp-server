import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetUserFollowing(server: McpServer) {
  server.tool(
    "get_user_following",
    `
      Get list of accounts a TikTok user is following (by secUid)

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
      max_time: z
        .string()
        .optional()
        .describe("max_time parameter is used for pagination. In the first request, the default value of max_time is 0. For subsequent requests, the value of max_time will be taken from the response of the previous request"),
      count: z
        .string()
        .optional()
        .default("30")
        .describe("The number of results to be returned")
    },
    async ({ secUid, max_time, count }) => {
      const data = await tikflyFetch("/api/user/followings", {
        secUid,
        ...(max_time ? { max_time } : {}),
        count: count ?? "30",
      });
      return ok(data);
    }
  );
}