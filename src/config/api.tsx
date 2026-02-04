export const HEADERS = {
  DEFAULT_HEADER: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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
    register: (payload: string) => ({
      endPoint: "/api/user/register",
      method: "POST",
      headers: HEADERS.DEFAULT_HEADER,
      payload,
    }),
  },
};
