import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { ConversationLoadingState } from '../types/loading'
import type { Conversations } from '../types/conversation.types'

interface AuthStore {
  loading: ConversationLoadingState
  message: string
  conversationMessages: Conversations[]

  setLoading: (key: string, value: boolean) => void
  getConversations: (receiver_id: string) => Promise<{
    success: boolean
    message: string | unknown
  }>
}

const useConversationStore = create<AuthStore>((set, get) => ({
  loading: {
    getConversations: false
  },
  message: '',
  conversationMessages: [],

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  getConversations: async (receiver_id: string) => {
    get().setLoading('getConversationLoading', true)
    try {
      const response = await apiCall(API_URLS.CONVERSATIONS.getConversations(receiver_id))
      get().setLoading('getNewPostsLoading', false)
      set({ conversationMessages: response.result.conversations })
      return response.result
    } catch (error) {
      console.error(error)
      get().setLoading('getNewPostsLoading', false)
    }
  }
}))

export default useConversationStore
