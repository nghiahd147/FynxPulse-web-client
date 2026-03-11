import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { Users } from "../types";

interface AuthStore {
  isLoading: boolean;
  message: string;
  data: Users[];

  registerUser: (payload: Users) => Promise<void>;
  loginUser: (payload: { email: string; password: string }) => Promise<void>;
  logoutUser: (payload: { refresh_token: string }) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  message: "",
  data: [],

  registerUser: async (payload: Users) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.register(payload));
      localStorage.setItem("access_token", response?.result.acessToken);
      localStorage.setItem("refresh_token", response?.result.refreshToken);
      localStorage.setItem("name", response?.user.name);
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (payload) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.login(payload));
      localStorage.setItem("access_token", response?.result.accessToken);
      localStorage.setItem("refresh_token", response?.result.refreshToken);
      localStorage.setItem("name", response?.user.name);
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async (payload) => {
    set({ isLoading: true });
    try {
      await apiCall(API_URLS.USERS.logout(payload));
      localStorage.removeItem("access_token");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
