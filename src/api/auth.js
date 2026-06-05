import { apiRequest, apiFormRequest } from "./http";

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

export function getProfile() {
  return apiRequest("auth/profile", { auth: true });
}

export function updateProfile({ name, bio, upiId, profilePicture }) {
  return apiRequest("auth/profile", {
    method: "PUT",
    auth: true,
    body: { name, bio, upiId, profilePicture },
  });
}

export function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);
  return apiFormRequest("auth/profile/upload-picture", formData, { auth: true });
}

