import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;
let refreshing: Promise<void> | null = null;

const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user-store");
  window.location.href = "/login";
};

const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const handleRefreshToken = async () => {
  const useUserStore = (await import("../store/useUserStore")).default;
  const result = await useUserStore.getState().refreshToken();
  if (!result.success) {
    throw result;
  }
};

axios.interceptors.request.use(async (config) => {
  if (!config.headers?.Authorization || config.url?.includes("refresh-token")) return config;

  const token = localStorage.getItem("access_token");
  if (!isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  if (!refreshing) {
    refreshing = handleRefreshToken().finally(() => {
      refreshing = null;
    });
  }

  try {
    await refreshing;
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return config;
  } catch {
    clearAuth();
    return Promise.reject(new Error("Refresh token failed"));
  }
});

export const apiCall = async ({
  endPoint,
  method,
  payload,
  headers,
  params,
}: {
  endPoint: string;
  method: string;
  payload?: Record<string, any>;
  headers?: Record<string, any>;
  params?: string | Record<string, any>;
}) => {
  try {
    const result = await axios({
      baseURL: apiUrl,
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    });

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
