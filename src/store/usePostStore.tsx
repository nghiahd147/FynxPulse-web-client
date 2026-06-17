import { create } from "zustand";
import { apiCall } from "../utils/axios";
import { API_URLS } from "../config/api";
import type { createPostPayload, Posts } from "../types/post.types";
import type { PostLoadingState } from "../types/loading";

interface AuthStore {
  loading: PostLoadingState;
  message: string;
  data: Posts[];

  setLoading: (key: string, value: boolean) => void;
  createPost: (payload: createPostPayload) => Promise<{ success: boolean; message: any; }>
}

const usePostStore = create<AuthStore>(
  (set, get) => ({
    loading: {
      createPost: false,
    },
    message: "",
    data: [],

    setLoading: (key: string, value: boolean) => {
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      }));
    },

    createPost: async (payload: createPostPayload) => {
      get().setLoading("createPostLoading", true);
      try {
        const response = await apiCall(API_URLS.POSTS.createPost(payload));

        get().setLoading("createPostLoading", false);
        return { success: true, message: response?.message };
      } catch (error) {
        get().setLoading("createPostLoading", false);
        return { success: false, message: error };
      }
    },
  }
  ),
);

export default usePostStore;
