import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import useReactionStore from '../../store/useReactionStore';
import { notificationError } from '../../config/notify';
import usePostStore from '../../store/usePostStore';
import useUserStore from '../../store/useUserStore';
import { EmotionTypes } from '../../types/reaction.types';

const REACTIONS: { id: number; label: string; color: string; emoji: string }[] = [
  { id: EmotionTypes.Like, label: 'Thích', color: 'text-[#1877F2]', emoji: '👍' },
  { id: EmotionTypes.Heart, label: 'Yêu thích', color: 'text-[#F33E58]', emoji: '❤️' },
  { id: EmotionTypes.Haha, label: 'Haha', color: 'text-[#F7B125]', emoji: '😂' },
  { id: EmotionTypes.Wow, label: 'Wow', color: 'text-[#F7B125]', emoji: '😮' },
  { id: EmotionTypes.Sad, label: 'Buồn', color: 'text-[#F7B125]', emoji: '😢' }
]

const PostReactionButton = ({ idPost, like_count }: { idPost: string, like_count: number }) => {
  const { profileUser } = useUserStore()
  const { getPostsByAuthorId } = usePostStore()
  const { reactionPost, unReactionPost } = useReactionStore()

  const [active, setActive] = useState<number | null>(null)
  const [hover, setHover] = useState(false)

  const current = REACTIONS.find((reaction) => reaction.id === active)

  const pick = async (id: number) => {
    setActive((prev) => (prev === id ? null : id))
    setHover(false)
    if (active !== id) {
      const payload = {
        post_id: idPost,
        type: id
      }
      const result = await reactionPost(payload)
      if (result.success) {
        getPostsByAuthorId(profileUser._id as string)
      } else {
        notificationError('Failed to add reaction')
      }
    } else {
      const payload = {
        post_id: idPost
      }
      const result = await unReactionPost(payload)
      if (result.success) {
        getPostsByAuthorId(profileUser._id as string)
      } else {
        notificationError('Failed to add reaction')
      }
    }
  }

  return (
    <div
      className='relative flex items-center gap-1'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute bottom-full left-0 z-20 pb-3 transition-all duration-200 origin-bottom-left ${hover
          ? 'pointer-events-auto scale-100 opacity-100 translate-y-0'
          : 'pointer-events-none scale-95 opacity-0 translate-y-1'
          }`}
      >
        <div className='flex items-center gap-3 rounded-full border border-[#E4E6EB] bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)]'>
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.id}
              type='button'
              title={reaction.label}
              onClick={() => pick(reaction.id)}
              className='cursor-pointer rounded-full transition-transform duration-200 hover:scale-125 active:scale-110'
            >
              <span className='flex h-11 w-11 items-center justify-center text-[2.75rem] leading-none select-none'>
                {reaction.emoji}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        type='button'
        onClick={() => pick(active ?? EmotionTypes.Like)}
        className={`cursor-pointer flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors ${active !== null ? current?.color : 'text-[#65676B] hover:bg-[#F2F2F2]'
          }`}
      >
        {active !== null ? (
          <span className='text-xl leading-none'>{current?.emoji}</span>
        ) : (
          <ThumbsUp className='h-5 w-5' strokeWidth={2} />
        )}
        {active !== null && <span className='text-sm font-semibold'>{current?.label}</span>}
      </button>
      <span className='text-sm font-medium text-[#65676B]'>{like_count}</span>
    </div>
  )
}

export default PostReactionButton
