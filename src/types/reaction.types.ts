import type { Users } from './user.types'

export const EmotionTypes = {
  Like: 0,
  Heart: 1,
  Haha: 2,
  Sad: 3,
  Wow: 4
}

export type EmotionType = (typeof EmotionTypes)[keyof typeof EmotionTypes]

export interface ReactionType {
  _id?: string
  post_id: string
  user_id: string
  type: EmotionType
  created_at: Date
}

export interface ReactionPostPayload {
  post_id: string
  type: number
}

export interface UnReactionPostPayload {
  post_id: string
}

export interface ReactionEmoji {
  post_id: string
  reaction_total: number
  emoji_info: {
    like: {
      total: number
      users: Users[]
    }
    heart: {
      total: number
      users: Users[]
    }
    haha: {
      total: number
      users: Users[]
    }
    sad: {
      total: number
      users: Users[]
    }
    wow: {
      total: number
      users: Users[]
    }
  }
}
