export const API_BASE_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

export const apiClient = async (endpoint, options = {}) => {
  const getHeaders = (token) => ({
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const fetchWithAuth = async (token) => {
    const config = {
      ...options,
      headers: getHeaders(token),
    };
    return fetch(`${API_BASE_URL}${endpoint}`, config);
  };

  let token = localStorage.getItem("access_token");
  let response = await fetchWithAuth(token);

  if (
    response.status === 401 &&
    endpoint !== "/auth/signin" &&
    endpoint !== "/auth/refresh"
  ) {
    if (!isRefreshing) {
      isRefreshing = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newToken = data.session.access_token;
            localStorage.setItem("access_token", newToken);
            localStorage.setItem("refresh_token", data.session.refresh_token);
            onTokenRefreshed(newToken);
            isRefreshing = false;
            token = newToken;
          } else {
            throw new Error("Refresh failed");
          }
        } catch (error) {
          isRefreshing = false;
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          throw error;
        }
      } else {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        throw new Error("No refresh token");
      }
    } else {
      // Wait for the ongoing refresh
      token = await new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          resolve(newToken);
        });
      });
    }

    // Retry the original request with the new token
    response = await fetchWithAuth(token);
  }

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch (e) {
      data = { message: await response.text() };
    }
  } else {
    const text = await response.text();
    data = { message: text };
  }

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
