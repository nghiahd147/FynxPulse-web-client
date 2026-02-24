import type { Users } from "../types";

export const HEADERS = {
  DEFAULT_HEADER: {
    "Content-Type": "application/json",
  },
  header: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: localStorage.getItem("jwt"),
  }),
  jsonHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: localStorage.getItem("jwt"),
  }),
  file_header: () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwt"),
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
  },
};
