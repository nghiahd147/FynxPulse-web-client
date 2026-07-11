import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { CommentLoadingState } from '../types/loading'
import type { CreateCommentPayload, Comments } from '../types/comment.types'

interface AuthStore {
  loading: CommentLoadingState
  message: string
  data: Comments[]
  commentsByPost: Record<string, Comments[]>
  loadingByPost: Record<string, boolean>

  setLoading: (key: string, value: boolean) => void
  getComments: (post_id: string) => Promise<{
    success: boolean
    message: string | unknown
  }>
  createComment: (payload: CreateCommentPayload) => Promise<{
    success: boolean
    message: string | unknown
  }>
  deleteComment: (id: string) => Promise<{
    success: boolean
    message: string | unknown
  }>
}

const useCommentStore = create<AuthStore>((set, get) => ({
  loading: {
    getComments: false,
    createComment: false,
    deleteComment: false
  },
  message: '',
  data: [],
  commentsByPost: {},
  loadingByPost: {},

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  getComments: async (post_id: string) => {
    get().setLoading('getComments', true)
    set((state) => ({ loadingByPost: { ...state.loadingByPost, [post_id]: true } }))
    try {
      const result = await apiCall(API_URLS.COMMENTS.getCommentByPost(post_id))
      get().setLoading('getComments', false)
      set((state) => ({
        data: result?.data || [],
        commentsByPost: { ...state.commentsByPost, [post_id]: result?.data || [] },
        loadingByPost: { ...state.loadingByPost, [post_id]: false }
      }))
      return { success: true, message: result?.message }
    } catch (error) {
      get().setLoading('getComments', false)
      set((state) => ({ loadingByPost: { ...state.loadingByPost, [post_id]: false } }))
      return { success: false, message: error }
    }
  },

  createComment: async (payload: CreateCommentPayload) => {
    get().setLoading('createComment', true)
    try {
      const result = await apiCall(API_URLS.COMMENTS.createCommentByPost(payload))
      get().setLoading('createComment', false)
      return { success: true, message: result?.message }
    } catch (error) {
      get().setLoading('createComment', false)
      return { success: false, message: error }
    }
  },

  deleteComment: async (id: string) => {
    get().setLoading('deleteComment', true)
    try {
      const result = await apiCall(API_URLS.COMMENTS.deleteComment(id))
      get().setLoading('deleteComment', false)
      return { success: true, message: result?.message }
    } catch (error) {
      get().setLoading('deleteComment', false)
      return { success: false, message: error }
    }
  }
}))

export default useCommentStore
