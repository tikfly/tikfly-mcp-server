import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tikflyFetch } from "../../http-client.js";
import { ok } from "../../utils/utils.js";

export function registerSearchLive(server: McpServer) {
  server.tool(
    "search_live",
    "Search TikTok live streams by keyword. Supports pagination via cursor and search_id",
    {
      keyword: z
        .string()
        .min(1)
        .describe("Keyword to find live streams"),
      cursor: z
        .string()
        .optional()
        .describe("Cursor parameter is used for pagination. In the first request, the default value of cursor is 0. For subsequent requests, the value of cursor will be taken from the response of the previous request. In the Search Endpoints, both cursor and search_id need to be provided when pagination is used"),
      search_id: z
        .string()
        .optional()
        .describe("search_id parameter is used for pagination. In the first request, the default value of the search_id is 0. For subsequent requests, the value of the cursor will be taken from the response of the previous request (from: log_pb.impr_id). In the Search Endpoints, both cursor and search_id need to be provided when pagination is used"),
    },
    async ({ keyword, cursor, search_id }) => {
      const data = await tikflyFetch("/api/search/live", {
        keyword,
        ...(cursor ? { cursor } : {}),
        ...(search_id ? { search_id } : {}),
      });
      return ok(data);
    }
  );
}