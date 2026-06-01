import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { ActionResult, ProfileUser, ParamsUser, Users } from "../types";
import type {
  ChangePasswordPayload,
  FollowUserPayload,
  LoginPayload,
  LogoutPayload,
} from "../types/payloads";
import type { ApiError } from "../types/errors";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoading: boolean;
  message: string;
  data: Users[];
  userFollowed: boolean | null;
  profileUser: ProfileUser;
  listFriends: Users[];
  myFriends: Users[];
  me: Users;
  openModalProfile: boolean;

  setOpenModalProfile: (open: boolean) => void;
  getMe: () => void;
  getListUser: (params: ParamsUser) => void;
  getProfile: (username: string) => void;
  checkUserFollowStatus: (follower_user_id: string) => void;
  unfollowUser: (follower_user_id: string) => Promise<ActionResult>;
  registerUser: (payload: Users) => Promise<ActionResult>;
  loginUser: (payload: LoginPayload) => Promise<ActionResult>;
  logoutUser: (payload: LogoutPayload) => Promise<ActionResult>;
  followUser: (payload: FollowUserPayload) => Promise<ActionResult>;
  changePassword: (payload: ChangePasswordPayload) => Promise<ActionResult>;
  getFollowSuggestions: (user_id: string) => void;
  getUserFollowing: (user_id: string, user_name: string) => void;
}

const useUserStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: false,
      message: "",
      data: [],
      listFriends: [],
      myFriends: [],
      userFollowed: null,
      profileUser: {},
      me: {},
      openModalProfile: false,

      setOpenModalProfile: (open: boolean) => {
        set({ openModalProfile: open });
      },
      registerUser: async (payload: Users) => {
        set({ isLoading: true });
        try {
          const response = await apiCall(API_URLS.USERS.register(payload));
          localStorage.setItem("access_token", response?.result.acessToken);
          localStorage.setItem("refresh_token", response?.result.refreshToken);
          localStorage.setItem("name", response?.user.name);
          set({ isLoading: false });
          return { success: true, message: response?.message };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error };
        }
      },

      loginUser: async (payload) => {
        set({ isLoading: true });
        try {
          const response = await apiCall(API_URLS.USERS.login(payload));
          localStorage.setItem("access_token", response?.result.access_token);
          localStorage.setItem("refresh_token", response?.result.refresh_token);
          set({ isLoading: false });
          return { success: true, message: response?.message };
        } catch (error) {
          const apiError = error as ApiError;
          set({ isLoading: false });
          return {
            success: false,
            message: apiError.message,
          };
        }
      },

      logoutUser: async (payload) => {
        set({ isLoading: true });
        try {
          const response = await apiCall(API_URLS.USERS.logout(payload));
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user-store");
          set({ isLoading: false });
          return { success: true, message: response?.message };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error };
        }
      },

      changePassword: async (payload) => {
        set({ isLoading: true });
        try {
          const result = await apiCall(API_URLS.USERS.changePassword(payload));
          set({ isLoading: false });
          return { success: true, message: result?.message };
        } catch (error) {
          console.log("Error Change Password", error);
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
            me: result?.result,
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
          set({ isLoading: false });
        }
      },

      checkUserFollowStatus: async (follower_user_id) => {
        set({ isLoading: true });
        try {
          const result = await apiCall(
            API_URLS.USERS.checkUserFollowStatus(follower_user_id),
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

      getFollowSuggestions: async (user_id: string) => {
        set({ isLoading: true });
        try {
          const result = await apiCall(
            API_URLS.USERS.getFollowSuggestions(user_id),
          );
          set({ isLoading: false, listFriends: result?.friends || [] });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      getUserFollowing: async (user_id: string, user_name: string) => {
        set({ isLoading: true });
        try {
          const result = await apiCall(
            API_URLS.USERS.getUserFollowing(user_id, user_name),
          );
          set({ isLoading: false, myFriends: result?.friends || [] });
        } catch (erorr) {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        me: state.me,
        profileUser: state.profileUser,
      }),
    },
  ),
);

export default useUserStore;
