import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { GlobalSearchLoadingState } from '../types/loading'
import type { GlobalSearchType } from '../types/search.types'
import type { Posts } from '../types/post.types'

interface AuthStore {
  loading: GlobalSearchLoadingState
  message: string
  result: Posts[]
  textSearchGlobal: string

  setLoading: (key: string, value: boolean) => void
  globalSearch: (params: GlobalSearchType) => Promise<{
    success: boolean
    data?: Posts[]
  }>
  setTextSearchGlobal: (value: string) => void
}

const useSearchStore = create<AuthStore>((set, get) => ({
  loading: {
    globalSearchLoading: false
  },
  message: '',
  result: [],
  textSearchGlobal: '',

  setTextSearchGlobal: (value: string) => {
    set({ textSearchGlobal: value })
  },

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  globalSearch: async (params: GlobalSearchType) => {
    get().setLoading('globalSearchLoading', true)
    try {
      const response = await apiCall(API_URLS.SEARCH.globalSearch(params))
      get().setLoading('globalSearchLoading', false)
      set({ result: response.result })
      return response.result
    } catch (error) {
      console.error(error)
      get().setLoading('globalSearchLoading', false)
    }
  }
}))

export default useSearchStore
