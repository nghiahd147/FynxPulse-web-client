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
import type { UserLoadingState } from "../types/loading";

interface AuthStore {
  loading: UserLoadingState;
  message: string;
  data: Users[];
  userFollowed: boolean | null;
  profileUser: ProfileUser;
  listFriends: Users[];
  myFriends: Users[];
  me: Users;
  openModalProfile: boolean;
  userNameSidebar: string;

  setLoading: (key: string, value: boolean) => void;
  setOpenModalProfile: (open: boolean) => void;
  setUserNameSidebar: (username: string) => void;
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
    (set, get) => ({
      loading: {
        changePassword: false,
        checkUserFollowStatus: false,
        followUser: false,
        getListUser: false,
        getMe: false,
        getProfile: false,
        getFollowSuggestions: false,
        getUserFollowing: false,
        loginUser: false,
        logoutUser: false,
        registerUser: false,
        unfollowUser: false,
      },
      userNameSidebar: "",
      message: "",
      data: [],
      listFriends: [],
      myFriends: [],
      userFollowed: null,
      profileUser: {},
      me: {},
      openModalProfile: false,

      setUserNameSidebar: (username) => {
        set({ userNameSidebar: username })
      },

      setLoading: (key: string, value: boolean) => {
        set((state) => ({
          loading: {
            ...state.loading,
            [key]: value,
          },
        }));
      },

      setOpenModalProfile: (open: boolean) => {
        set({ openModalProfile: open });
      },

      registerUser: async (payload: Users) => {
        get().setLoading("isRegisterUserLoading", true);
        try {
          const response = await apiCall(API_URLS.USERS.register(payload));
          localStorage.setItem("access_token", response?.result.acessToken);
          localStorage.setItem("refresh_token", response?.result.refreshToken);
          localStorage.setItem("name", response?.user.name);
          get().setLoading("isRegisterUserLoading", false);
          return { success: true, message: response?.message };
        } catch (error) {
          get().setLoading("isRegisterUserLoading", false);
          return { success: false, message: error };
        }
      },

      loginUser: async (payload) => {
        get().setLoading("loginUser", true);
        try {
          const response = await apiCall(API_URLS.USERS.login(payload));
          localStorage.setItem("access_token", response?.result.access_token);
          localStorage.setItem("refresh_token", response?.result.refresh_token);
          get().setLoading("loginUser", false);
          return { success: true, message: response?.message };
        } catch (error) {
          const apiError = error as ApiError;
          get().setLoading("loginUser", false);
          return {
            success: false,
            message: apiError.message,
          };
        }
      },

      logoutUser: async (payload) => {
        get().setLoading("logoutUser", true);
        try {
          const response = await apiCall(API_URLS.USERS.logout(payload));
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user-store");
          get().setLoading("logoutUser", false);
          return { success: true, message: response?.message };
        } catch (error) {
          get().setLoading("logoutUser", false);
          return { success: false, message: error };
        }
      },

      changePassword: async (payload) => {
        get().setLoading("changePassword", true);
        try {
          const result = await apiCall(API_URLS.USERS.changePassword(payload));
          get().setLoading("changePassword", false);
          return { success: true, message: result?.message };
        } catch (error) {
          console.log("Error Change Password", error);
          get().setLoading("changePassword", false);
          return { success: false, message: error };
        }
      },

      getListUser: async (params) => {
        get().setLoading("getListUser", true);
        try {
          const result = await apiCall(API_URLS.USERS.getListUser(params));
          get().setLoading("getListUser", false);
          set({ data: result?.data });
        } catch (error) {
          get().setLoading("getListUser", false);
        }
      },

      getMe: async () => {
        get().setLoading("getMe", true);
        try {
          const result = await apiCall(API_URLS.USERS.getMe());
          get().setLoading("getMe", false);
          set({
            profileUser: result?.result,
            me: result?.result,
          });
        } catch (error) {
          // console.log("Error Get Me", error)
          get().setLoading("getMe", false);
        }
      },

      getProfile: async (username: string) => {
        get().setLoading("getProfile", true);
        try {
          const result = await apiCall(API_URLS.USERS.getProfile(username));
          get().setLoading("getProfile", false);
          set({ profileUser: result?.result });
        } catch (error) {
          get().setLoading("getProfile", false);
        }
      },

      checkUserFollowStatus: async (follower_user_id) => {
        get().setLoading("checkUserFollowStatus", true);
        try {
          const result = await apiCall(
            API_URLS.USERS.checkUserFollowStatus(follower_user_id),
          );
          get().setLoading("checkUserFollowStatus", false);
          set({ userFollowed: result?.followed });
        } catch (error) {
          get().setLoading("checkUserFollowStatus", false);
        }
      },

      followUser: async (payload) => {
        get().setLoading("followUser", true);
        try {
          const result = await apiCall(API_URLS.USERS.followUser(payload));
          get().setLoading("followUser", false);
          return { success: true, message: result?.result?.message };
        } catch (error) {
          get().setLoading("followUser", false);
          return { success: false, message: error };
        }
      },

      unfollowUser: async (follower_user_id) => {
        get().setLoading("unfollowUser", true);
        try {
          const result = await apiCall(
            API_URLS.USERS.unfollowUser(follower_user_id),
          );
          console.log("result", result);
          get().setLoading("unfollowUser", false);
          return { success: true, message: result?.message };
        } catch (error) {
          get().setLoading("unfollowUser", false);
          return { success: false, message: error };
        }
      },

      getFollowSuggestions: async (user_id: string) => {
        get().setLoading("getFollowSuggestions", true);
        try {
          const result = await apiCall(
            API_URLS.USERS.getFollowSuggestions(user_id),
          );
          get().setLoading("getFollowSuggestions", false);
          set({ listFriends: result?.friends || [] });
        } catch (error) {
          get().setLoading("getFollowSuggestions", false);
        }
      },

      getUserFollowing: async (user_id: string, user_name: string) => {
        get().setLoading("getUserFollowing", true);
        try {
          const result = await apiCall(
            API_URLS.USERS.getUserFollowing(user_id, user_name),
          );
          get().setLoading("getUserFollowing", false);
          set({ myFriends: result?.friends || [] });
        } catch (erorr) {
          get().setLoading("getUserFollowing", false);
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
