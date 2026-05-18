import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { ActionResult, Users } from "../types";

interface AuthStore {
  isLoading: boolean;
  message: string;
  data: Users[];

  registerUser: (payload: Users) => Promise<ActionResult>;
  loginUser: (payload: {
    email: string;
    password: string;
  }) => Promise<ActionResult>;
  logoutUser: (payload: { refresh_token: string }) => Promise<ActionResult>;
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
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: String(error) };
    }
  },

  loginUser: async (payload) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.login(payload));
      localStorage.setItem("access_token", response?.result.accessToken);
      localStorage.setItem("refresh_token", response?.result.refreshToken);
      localStorage.setItem("name", response?.user.name);
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: String(error) };
    }
  },

  logoutUser: async (payload) => {
    set({ isLoading: true });
    try {
      await apiCall(API_URLS.USERS.logout(payload));
      localStorage.removeItem("access_token");
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: String(error) };
    }
  },
}));

export default useAuthStore;
