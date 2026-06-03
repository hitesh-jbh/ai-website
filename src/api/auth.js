import { apiRequest } from "./http";

export function register({ name, email, phone, password, role = "user" }) {
  return apiRequest("auth/register", {
    method: "POST",
    body: { name, email, phone, password, role },
  });
}

export function login({ email, phone, password }) {
  return apiRequest("auth/login", {
    method: "POST",
    body: { email, phone, password },
  });
}

export function forgotPassword({ email }) {
  return apiRequest("auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

