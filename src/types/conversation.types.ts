export interface Conversations {
  _id?: string
  sender_id: string
  receiver_id: string
  content: string
  created_at?: Date
  updated_at?: Date
}

export interface GetConversations {
  page: number
  page_size: number
  receiver_id: string
}

export interface ConversationsResult {
  page: number
  total_page: number
  page_size: number
  total: number
  conversations: Conversations[]
}
