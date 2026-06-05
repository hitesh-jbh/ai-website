import { apiRequest } from "./http";

const PERIOD_MAP = {
  "All Time": "all",
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
};

export function mapLeaderboardPeriod(timeframe) {
  return PERIOD_MAP[timeframe] || "all";
}

export function getTopUsers({ period = "all", limit = 20, page = 1 } = {}) {
  const offset = (page - 1) * limit;
  const qs = new URLSearchParams({
    period,
    limit: String(limit),
    page: String(page),
    offset: String(offset),
  });
  return apiRequest(`leaderboard/top?${qs}`, { auth: false });
}

export function getUserRank({ period = "all" } = {}) {
  const qs = new URLSearchParams({ period });
  return apiRequest(`leaderboard/rank?${qs}`, { auth: true });
}
