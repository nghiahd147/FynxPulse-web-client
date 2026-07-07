import { EmotionTypes } from '../types/reaction.types'

export const TypePost = {
  Post: 'Post',
  Repost: 'Repost',
  Comment: 'Comment',
  QuotePost: 'QuotePost'
}

export const Reactions: { id: number; label: string; color: string; emoji: string }[] = [
  { id: EmotionTypes.Like, label: 'Thích', color: 'text-[#1877F2]', emoji: '👍' },
  { id: EmotionTypes.Heart, label: 'Yêu thích', color: 'text-[#F33E58]', emoji: '❤️' },
  { id: EmotionTypes.Haha, label: 'Haha', color: 'text-[#F7B125]', emoji: '😂' },
  { id: EmotionTypes.Wow, label: 'Wow', color: 'text-[#F7B125]', emoji: '😮' },
  { id: EmotionTypes.Sad, label: 'Buồn', color: 'text-[#F7B125]', emoji: '😢' }
]
