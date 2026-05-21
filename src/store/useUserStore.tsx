import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { ActionResult, profileUser, ParamsUser, Users } from "../types";

interface AuthStore {
  isLoading: boolean;
  message: string;
  data: Users[];
  profileUser: profileUser;

  registerUser: (payload: Users) => Promise<ActionResult>;
  loginUser: (payload: {
    email: string;
    password: string;
  }) => Promise<ActionResult>;
  logoutUser: (payload: { refresh_token: string }) => Promise<ActionResult>;
  getMe: () => void;
  getListUser: (params: ParamsUser) => void;
  getProfile: (user_name: string) => void;
}

const useUserStore = create<AuthStore>((set) => ({
  isLoading: false,
  message: "",
  data: [],
  profileUser: {},

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
      localStorage.setItem("user_name", response?.user.user_name);
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

  getListUser: async (params) => {
    set({ isLoading: true });
    try {
      const result = await apiCall(API_URLS.USERS.getListUser(params));
      set({ isLoading: false, data: result?.data });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  getMe: async () => {
    set({ isLoading: true });
    try {
      const result = await apiCall(API_URLS.USERS.getMe());
      set({
        isLoading: false,
        profileUser: result?.result,
      });
    } catch (error) {
      // console.log("Error Get Me", error)
      set({ isLoading: false });
    }
  },

  getProfile: async (username: string) => {
    set({ isLoading: true });
    try {
      const result = await apiCall(API_URLS.USERS.getProfile(username));
      set({ isLoading: false, profileUser: result?.result });
    } catch (error) {
      console.log("getProfile error: ", error);
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
