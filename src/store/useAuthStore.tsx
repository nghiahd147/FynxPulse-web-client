import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import { data } from "react-router-dom";

const useAuthStore = create((set) => ({
  isLoading: false,
  message: "",
  data,

  register: async (payload: any) => {
    set({ isLoading: true });
    try {
      const response = apiCall(API_URLS.USERS.register(payload));
      set({ isLoading: false, data: response });
    } catch (error) {
      console.log("error", error);
      set({ message: error });
    }
  },
}));

export default useAuthStore;
