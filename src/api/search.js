import { apiRequest, apiFormRequest } from "./http";

const DEPTH_MAP = {
  Quick: "short",
  Balanced: "medium",
  Deep: "deepSearch",
};

export function mapAiPreference(depth) {
  return DEPTH_MAP[depth] || "medium";
}

export function search({ query, threadId, aiPreference = "medium", filters }) {
  return apiRequest("search", {
    method: "POST",
    auth: true,
    body: { query, threadId, aiPreference, filters },
  });
}

export function getSearchHistory({ limit = 20, page = 1 } = {}) {
  const qs = new URLSearchParams({ limit: String(limit), page: String(page) });
  return apiRequest(`search/history?${qs}`, { auth: true });
}

export function submitCommunityAnswer({ query, answer, filters, file }) {
  const formData = new FormData();
  formData.append("query", query);
  formData.append("answer", answer);
  if (filters) formData.append("filters", JSON.stringify(filters));
  if (file) formData.append("file", file);
  return apiFormRequest("search/community/answer", formData, { auth: true });
}
