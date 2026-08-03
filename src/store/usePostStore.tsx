import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { createPostPayload, Posts } from '../types/post.types'
import type { PostLoadingState } from '../types/loading'

interface AuthStore {
  loading: PostLoadingState
  message: string
  data: Posts[]
  postByAuthor: Posts[]

  setLoading: (key: string, value: boolean) => void
  getPostsByAuthorId: ({ page, page_size, author_id }: { page: number; page_size: number; author_id: string }) => void
  createPost: (payload: createPostPayload) => Promise<{ success: boolean; message: string | unknown }>
  deletePost: (id: string) => Promise<{ success: boolean; message: string | unknown }>
}

const usePostStore = create<AuthStore>((set, get) => ({
  loading: {
    getPostsByAuthorId: false,
    createPost: false,
    deletePostLoading: false
  },
  message: '',
  postByAuthor: [],
  data: [],

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  getPostsByAuthorId: async ({
    page,
    page_size,
    author_id
  }: {
    page: number
    page_size: number
    author_id: string
  }) => {
    get().setLoading('getPostsByAuthorId', true)
    try {
      const response = await apiCall(API_URLS.POSTS.getPostsByAuthorId({ page, page_size, author_id }))
      get().setLoading('getPostsByAuthorId', false)
      set({ postByAuthor: response.result.data })
    } catch (error) {
      console.error(error)
      get().setLoading('getPostsByAuthorId', false)
    }
  },

  createPost: async (payload: createPostPayload) => {
    get().setLoading('createPostLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.createPost(payload))
      get().setLoading('createPostLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('createPostLoading', false)
      return { success: false, message: error }
    }
  },

  deletePost: async (id: string) => {
    get().setLoading('deletePostLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.deletePost(id))
      get().setLoading('deletePostLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('deletePostLoading', false)
      return { success: false, message: error }
    }
  }
}))

export default usePostStore
