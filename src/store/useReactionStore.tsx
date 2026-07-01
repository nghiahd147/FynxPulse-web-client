import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { ReactionLoadingState } from '../types/loading'
import type { ReactionPostPayload, Reactions, UnReactionPostPayload } from '../types/reaction.types'

interface AuthStore {
    loading: ReactionLoadingState
    message: string
    data: Reactions[]

    setLoading: (key: string, value: boolean) => void
    reactionPost: (payload: ReactionPostPayload) => Promise<{ success: boolean; message: string | unknown }>
    unReactionPost: (payload: UnReactionPostPayload) => Promise<{ success: boolean; message: string | unknown }>
}

const useReactionStore = create<AuthStore>((set, get) => ({
    loading: {
        reactionPost: false,
        unReactionPost: false
    },
    message: '',
    data: [],

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

}))

export default useReactionStore
