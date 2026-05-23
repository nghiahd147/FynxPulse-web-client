import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { ActionResult, profileUser, ParamsUser, Users } from "../types";
import type { FollowUserPayload } from "../types/payloads";

interface AuthStore {
  isLoading: boolean;
  message: string;
  data: Users[];
  userFollowed: boolean | null;
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
  followUser: (payload: FollowUserPayload) => Promise<ActionResult>;
  getUserFollow: (follower_user_id: string) => void;
  unfollowUser: (follower_user_id: string) => Promise<ActionResult>;
}

const useUserStore = create<AuthStore>((set) => ({
  isLoading: false,
  message: "",
  data: [],
  userFollowed: null,
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
      return { success: false, message: error };
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
      return { success: false, message: error };
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

  getUserFollow: async (follower_user_id) => {
    set({ isLoading: true });
    try {
      const result = await apiCall(
        API_URLS.USERS.getUserFollow(follower_user_id),
      );
      set({ isLoading: false, userFollowed: result?.followed });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  followUser: async (payload) => {
    set({ isLoading: true });
    try {
      const result = await apiCall(API_URLS.USERS.followUser(payload));
      set({ isLoading: false });
      return { success: true, message: result?.result?.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error };
    }
  },

  unfollowUser: async (follower_user_id) => {
    set({ isLoading: true });
    try {
      const result = await apiCall(
        API_URLS.USERS.unfollowUser(follower_user_id),
      );
      console.log("result", result);
      set({ isLoading: false });
      return { success: true, message: result?.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error };
    }
  },
}));

export default useUserStore;
