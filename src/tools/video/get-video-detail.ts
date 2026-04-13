import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetVideoDetail(server: McpServer) {
  server.tool(
    "get_video_detail",
    "Get detailed information of a TikTok video by video ID. Use this to fetch metadata like description, stats, creator, etc.",
    {
      videoId: z
        .string()
        .min(1)
        .describe("TikTok video ID, e.g. '7572198435487501598'"),
    },
    async ({ videoId }) => {
      const data = await tikflyFetch("/api/post/detail", { videoId });
      return ok(data);
    }
  );
}