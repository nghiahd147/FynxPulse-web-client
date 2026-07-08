import type { Users } from './user.types'

export interface Comments {
  _id?: string
  post_id: string
  author_id: string
  content: string
  created_at?: Date
  updated_at?: Date
  userInfo: Users
}

export interface CreateCommentPayload {
  post_id: string
  content: string
}
