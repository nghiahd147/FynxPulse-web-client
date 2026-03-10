import type { Users } from "../types";

export const HEADERS = {
  DEFAULT_HEADER: {
    "Content-Type": "application/json",
  },
  header: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: localStorage.getItem("token"),
  }),
  jsonHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
  file_header: () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token"),
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
    login: (payload: { email: string; password: string }) => ({
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
  },
};
