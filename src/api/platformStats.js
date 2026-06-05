import { apiRequest } from "./http";

export function getPlatformStats() {
  return apiRequest("platform-stats", { auth: true });
}
