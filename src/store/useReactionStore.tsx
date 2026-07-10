import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { ReactionLoadingState } from '../types/loading'
import type { ReactionEmoji, ReactionPostPayload, ReactionType, UnReactionPostPayload } from '../types/reaction.types'

interface ReactionStore {
  loading: ReactionLoadingState
  message: string
  data: ReactionType[]
  reactions: Record<string, ReactionEmoji>

  setLoading: (key: string, value: boolean) => void
  reactionPost: (payload: ReactionPostPayload) => Promise<{ success: boolean; message: string | unknown }>
  unReactionPost: (payload: UnReactionPostPayload) => Promise<{ success: boolean; message: string | unknown }>
  getReactionByPost: (post_id: string) => Promise<{ success: boolean; message: string | unknown }>
}

const useReactionStore = create<ReactionStore>((set, get) => ({
  loading: {
    reactionPost: false,
    unReactionPost: false,
    getReactionByPost: false
  },
  message: '',
  data: [],
  reactions: {},

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  reactionPost: async (payload: ReactionPostPayload) => {
    get().setLoading('reactionPost', true)
    try {
      const response = await apiCall(API_URLS.REACTIONS.reactionPost(payload))
      get().setLoading('reactionPost', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('reactionPost', false)
      return { success: false, message: error }
    }
  },

  unReactionPost: async (payload: UnReactionPostPayload) => {
    get().setLoading('unReactionPost', true)
    try {
      const response = await apiCall(API_URLS.REACTIONS.unReactionPost(payload))
      get().setLoading('unReactionPost', false)
      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('unReactionPost', false)
      return { success: false, message: error }
    }
  },

  getReactionByPost: async (post_id: string) => {
    get().setLoading('getReactionByPost', true)
    try {
      const response = await apiCall(API_URLS.REACTIONS.getReactionsByPostId(post_id))
      const result = response?.result as ReactionEmoji | ReactionEmoji[]
      const reaction = Array.isArray(result) ? result[0] : result

      if (reaction) {
        set((state) => ({
          reactions: { ...state.reactions, [post_id]: reaction }
        }))
      }

      return { success: true, message: response?.message }
    } catch (error) {
      get().setLoading('getReactionByPost', false)
      return { success: false, message: error }
    }
  }
}))

export default useReactionStore
