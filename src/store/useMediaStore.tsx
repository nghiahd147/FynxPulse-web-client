import { create } from 'zustand'
import { apiCall } from '../utils/axios'
import { API_URLS } from '../config/api'
import type { MediaLoadingState } from '../types/loading'
import type { CreateImagePayload, ImageType } from '../types/media.types'

interface AuthStore {
  loading: MediaLoadingState
  message: string
  urlImage: ImageType[]

  setLoading: (key: string, value: boolean) => void
  createImage: (payload: CreateImagePayload) => Promise<{
    success: boolean
    message: string | unknown
    data?: ImageType[]
  }>
}

const useMediaStore = create<AuthStore>((set, get) => ({
  loading: {
    createImage: false,
  },
  message: '',
  urlImage: [],

  setLoading: (key: string, value: boolean) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [key]: value
      }
    }))
  },

  createImage: async (payload: CreateImagePayload) => {
    get().setLoading('createImage', true)
    try {
      const formData = new FormData()
      formData.append('image', payload.file)
      const response = await apiCall(API_URLS.UPLOADS.createImage(formData))
      get().setLoading('createImage', false)
      const data = response.result as ImageType[]
      set({ urlImage: data })
      return { success: true, message: response?.message, data }
    } catch (error) {
      get().setLoading('createImage', false)
      return { success: false, message: error }
    }
  },
}))

export default useMediaStore
