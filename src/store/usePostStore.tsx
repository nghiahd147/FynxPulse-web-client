import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { createPostPayload, PostByAuthor, Posts, QoutePayloadType } from '../types/post.types'
import type { PostLoadingState } from '../types/loading'

interface AuthStore {
  loading: PostLoadingState
  message: string
  data: Posts[]
  postByAuthor: PostByAuthor | null
  newPosts: PostByAuthor | null

  setLoading: (key: string, value: boolean) => void
  getNewPosts: ({ page, page_size }: { page: number; page_size: number }) => Promise<PostByAuthor | undefined>
  getPostsByAuthorId: (query: { page?: number; page_size?: number; author_id?: string }) => Promise<PostByAuthor | undefined>
  createPost: (payload: createPostPayload) => Promise<{ success: boolean; message: string | unknown }>
  deletePost: (id: string) => Promise<{ success: boolean; message: string | unknown }>
  repost: (post_id: string) => Promise<{ success: boolean; message: string | unknown }>
  qoutePost: (post_id: string, payload: QoutePayloadType) => Promise<{ success: boolean; message: string | unknown }>
  undoRepost: (post_id: string) => Promise<{ success: boolean; message: string | unknown }>
  undoQoute: (post_id: string) => Promise<{ success: boolean; message: string | unknown }>
}

const usePostStore = create<AuthStore>((set, get) => ({
  loading: {
    getNewPostsLoading: false,
    getPostsByAuthorId: false,
    createPost: false,
    deletePostLoading: false,
    repostLoading: false,
    qouteLoading: false,
    undoRepostLoading: false,
    undoQouteLoading: false
  },
  message: '',
  postByAuthor: null,
  data: [],
  newPosts: null,

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  getNewPosts: async ({ page, page_size }: { page: number; page_size: number }) => {
    get().setLoading('getNewPostsLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.getNewPosts({ page, page_size }))
      get().setLoading('getNewPostsLoading', false)
      set({ newPosts: response.result })
      return response.result
    } catch (error) {
      console.error(error)
      get().setLoading('getNewPostsLoading', false)
    }
  },

  getPostsByAuthorId: async ({
    page = 1,
    page_size = 5,
    author_id
  }: {
    page?: number
    page_size?: number
    author_id?: string
  }) => {
    if (!author_id) return
    get().setLoading('getPostsByAuthorId', true)
    try {
      const response = await apiCall(API_URLS.POSTS.getPostsByAuthorId({ page, page_size, author_id }))
      get().setLoading('getPostsByAuthorId', false)
      set({ postByAuthor: response.result })
      return response.result
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
  },

  repost: async (post_id) => {
    get().setLoading('repostLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.repost(post_id))
      get().setLoading('repostLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('repostLoading', false)
      return { success: false, message: error }
    }
  },

  qoutePost: async (post_id: string, payload: QoutePayloadType) => {
    get().setLoading('qoutePostLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.qoutepost({ post_id, payload }))
      get().setLoading('qoutePostLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('qoutePostLoading', false)
      return { success: false, message: error }
    }
  },

  undoRepost: async (post_id: string) => {
    get().setLoading('undoRepostLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.undoRepost(post_id))
      get().setLoading('undoRepostLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('undoRepostLoading', false)
      return { success: false, message: error }
    }
  },

  undoQoute: async (post_id: string) => {
    get().setLoading('undoQouteLoading', true)
    try {
      const response = await apiCall(API_URLS.POSTS.undoQoutepost(post_id))
      get().setLoading('undoQouteLoading', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('undoQouteLoading', false)
      return { success: false, message: error }
    }
  }
}))

export default usePostStore
