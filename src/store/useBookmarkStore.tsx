import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { BookmarkLoadingState } from '../types/loading'

interface AuthStore {
  loading: BookmarkLoadingState
  message: string
  status: boolean | null

  setLoading: (key: string, value: boolean) => void
  getStatusBookmark: (post_id: string) => Promise<{
    success: boolean
    message: string | unknown
  }>
}

const useBookmarkStore = create<AuthStore>((set, get) => ({
  loading: {
    getStatusBookmark: false
  },
  message: '',
  status: null,

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  getStatusBookmark: async (post_id: string) => {
    get().setLoading('getStatusBookmark', true)
    try {
      const response = await apiCall(API_URLS.BOOKMARKS.getStatus(post_id))
      get().setLoading('getStatusBookmark', false)
      set({ status: response.result })
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('getStatusBookmark', false)
      return { success: false, message: error }
    }
  }
}))

export default useBookmarkStore
