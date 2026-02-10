import { apiClient } from "./base";

export const signIn = async (email, password) => {
  return apiClient("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signUp = async (userData) => {
  return apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getMe = async () => {
  return apiClient("/auth/me");
};

export const getGoogleAuthUrl = async () => {
  return apiClient(
    `/auth/google?redirect=${window.location.origin}/auth/google`,
  );
};
