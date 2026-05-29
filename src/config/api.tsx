import type { ParamsUser, Users } from "../types";
import type {
  ChangePasswordPayload,
  FollowUserPayload,
  LoginPayload,
} from "../types/payloads";

export const HEADERS = {
  DEFAULT_HEADER: {
    "Content-Type": "application/json",
  },
  header: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: localStorage.getItem("access_token"),
  }),
  jsonHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  }),
  file_header: () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("access_token"),
  }),
};

export const API_URLS = {
  USERS: {
    register: (payload: Users) => ({
      endPoint: "/api/user/register",
      method: "POST",
      headers: HEADERS.DEFAULT_HEADER,
      payload,
    }),
    login: (payload: LoginPayload) => ({
      endPoint: "/api/user/login",
      method: "POST",
      headers: HEADERS.DEFAULT_HEADER,
      payload,
    }),
    logout: (payload: { refresh_token: string }) => ({
      endPoint: "/api/user/logout",
      method: "POST",
      headers: HEADERS.jsonHeader(),
      payload,
    }),
    changePassword: (payload: ChangePasswordPayload) => ({
      endPoint: "/api/user/change-password",
      method: "PUT",
      headers: HEADERS.jsonHeader(),
      payload,
    }),
    getListUser: (params: ParamsUser) => ({
      endPoint: "/api/user/",
      method: "GET",
      headers: HEADERS.jsonHeader(),
      params,
    }),
    getMyFriends: () => ({
      endPoint: "/api/user/my-friends",
      method: "GET",
      headers: HEADERS.jsonHeader(),
    }),
    getMe: () => ({
      endPoint: "/api/user/me",
      method: "GET",
      headers: HEADERS.jsonHeader(),
    }),
    getProfile: (username: string) => ({
      endPoint: `/api/user/${username}`,
      method: "GET",
      headers: HEADERS.jsonHeader(),
    }),
    getUserFollow: (follower_user_id: string) => ({
      endPoint: `/api/user/get-user-follow/${follower_user_id}`,
      method: "GET",
      headers: HEADERS.jsonHeader(),
    }),
    followUser: (payload: FollowUserPayload) => ({
      endPoint: "/api/user/follow",
      method: "POST",
      headers: HEADERS.jsonHeader(),
      payload,
    }),
    unfollowUser: (follower_user_id: string) => ({
      endPoint: `/api/user/unfollow/${follower_user_id}`,
      method: "DELETE",
      headers: HEADERS.jsonHeader(),
    }),
    getListFriends: () => ({
      endPoint: "/api/user/list-friends",
      method: "GET",
      headers: HEADERS.jsonHeader(),
    }),
  },
};
