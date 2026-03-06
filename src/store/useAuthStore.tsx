import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { Users } from "../types";

interface AuthStore {
  isLoading: boolean;
  accessToken: string;
  message: string;
  data: Users[];

  registerUser: (payload: Users) => Promise<void>;
  loginUser: (payload: { email: string; password: string }) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  accessToken: "",
  message: "",
  data: [],

  registerUser: async (payload: Users) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.register(payload));
      localStorage.setItem("token", response?.result.acessToken);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  loginUser: async (payload) => {
    set({ isLoading: true });
    try {
      const response = await apiCall(API_URLS.USERS.login(payload));
      console.log(response);
      localStorage.setItem("token", response?.result.accessToken);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
