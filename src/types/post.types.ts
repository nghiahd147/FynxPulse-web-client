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
  parent_id?: Posts
  hashtags?: Hashtag[]
  user_info_parent?: {
    first_name: string
    last_name: string
    avatar: string
  }
  mentions?: string[]
  guest_views?: number
  user_views?: number
  views?: number
  reaction_count?: number
  comment_count?: number
  has_reaction?: ReactionType[]
  post_children?: Posts[]
  post_children_repost?: Posts[]
  post_children_qoute?: Posts[]
  created_at?: Date
  updated_at?: Date
}

export interface PostByAuthor {
  page: number
  page_size: number
  total_page: number
  total: number
  data: Posts[]
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
