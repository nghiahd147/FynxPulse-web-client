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
  hashtags?: string[]
  mentions?: string[]
  guest_view?: number
  user_view?: number
  like_count?: number
  comment_count?: number
  has_reaction?: ReactionType
  created_at?: Date
  updated_at?: Date
}

export interface createPostPayload {
  content: string
}
