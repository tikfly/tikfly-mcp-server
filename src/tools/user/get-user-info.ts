import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerGetUserInfo(server: McpServer) {
  server.tool(
    "get_user_info",
    "Get TikTok user information by username (uniqueId)",
    {
      uniqueId: z
        .string()
        .min(1)
        .describe("TikTok username, e.g. 'taylorswift'"),
    },
    async ({ uniqueId }) => {
      const data = await tikflyFetch("/api/user/info", { uniqueId });
      return ok(data);
    }
  );
}
