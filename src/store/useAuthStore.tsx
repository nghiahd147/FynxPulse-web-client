import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { Users } from "../types";

interface AuthStore {
  isLoading: boolean;
  refresh_token: string;
  message: string;
  data: Users[];

  registerUser: (payload: Users) => Promise<void>;
  loginUser: (payload: { email: string; password: string }) => Promise<void>;
  logoutUser: (payload: { refresh_token: string }) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  refresh_token: "",
  message: "",
  data: [],

  registerUser: async (payload: Users) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.register(payload));
      localStorage.setItem("token", response?.result.acessToken);
      set({ refresh_token: response?.result.refreshToken });
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (payload) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.login(payload));
      localStorage.setItem("token", response?.result.accessToken);
      set({ refresh_token: response?.result.refreshToken });
    } finally {
      set({ isLoading: false });
    }
  },

  logoutUser: async (payload) => {
    set({ isLoading: true });
    try {
      console.log("refresh_token", payload);
      await apiCall(API_URLS.USERS.logout(payload));
      localStorage.removeItem("token");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
