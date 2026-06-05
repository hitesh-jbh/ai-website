import { apiRequest } from "./http";

export function createThread() {
  return apiRequest("threads/new", { method: "POST", auth: true });
}
