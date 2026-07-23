import type { ReactionType } from './reaction.types'
import type { Users } from './user.types'

export interface Posts {
  _id?: string
  author_id: string
  user_info: Users
  type: number
  content: string
  media?: number
  audience: number
  parent_id?: string
  hashtags?: Hashtag[]
  mentions?: string[]
  guest_views?: number
  user_views?: number
  reaction_count?: number
  comment_count?: number
  has_reaction?: ReactionType[]
  created_at?: Date
  updated_at?: Date
}

export interface Hashtag {
  _id: string
  name: string
  created_at?: Date
}

export interface createPostPayload {
  type: Number
  content: string
  audience: number
  medias: {
    url: string
    type: number
  }[]
  mentions: string[]
  hashtags: string[]
  parent_id: string | null
}
