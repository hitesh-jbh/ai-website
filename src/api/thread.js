import { apiRequest } from "./http";

export function createThread() {
  return apiRequest("threads/new", { method: "POST", auth: true });
}

export function getThreadMessages(threadId) {
  return apiRequest(`threads/${threadId}`, { method: "GET", auth: true });
}

export function getThreads(limit = 50, offset = 0) {
  const qs = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  return apiRequest(`threads?${qs}`, { method: "GET", auth: true });
}

export function deleteThread(threadId) {
  return apiRequest(`threads/${threadId}`, {
    method: "DELETE",
    auth: true,
  });
}
