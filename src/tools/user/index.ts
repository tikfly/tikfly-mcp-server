import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetUserInfo } from "./get-user-info.js";
import { registerGetUserVideos } from "./get-user-videos.js";
import { registerGetUserFollower } from "./get-user-follower.js";
import { registerGetUserFollowing } from "./get-user-following.js";
import { registerGetUserStory } from "./get-user-story.js";

export function registerUserTools(server: McpServer) {
  registerGetUserInfo(server);
  registerGetUserVideos(server);
  registerGetUserFollower(server);
  registerGetUserFollowing(server);
  registerGetUserStory(server);
}
