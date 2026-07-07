import { useEffect, useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import useReactionStore from '../../store/useReactionStore'
import { notificationError } from '../../config/notify'
import usePostStore from '../../store/usePostStore'
import useUserStore from '../../store/useUserStore'
import { EmotionTypes, type ReactionType } from '../../types/reaction.types'
import { Reactions } from '../../constants/enum'

const PostReactionButton = ({
  post_id,
  like_count,
  has_reaction
}: {
  post_id: string
  like_count: number
  has_reaction?: ReactionType
}) => {
  const { profileUser } = useUserStore()
  const { getPostsByAuthorId } = usePostStore()
  const { reactionPost, unReactionPost } = useReactionStore()

  const [active, setActive] = useState<number | null>(has_reaction?.type ?? null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    setActive(has_reaction?.type ?? null)
  }, [has_reaction?.type])

  const current = Reactions.find((reaction) => reaction.id === active)

  const pick = async (id: number) => {
    const isRemoving = active === id
    setActive(isRemoving ? null : id)
    setHover(false)
    const result = isRemoving ? await unReactionPost({ post_id }) : await reactionPost({ post_id, type: id })
    if (result.success) {
      getPostsByAuthorId(profileUser._id as string)
    } else {
      notificationError('Failed to add reaction')
      setActive(has_reaction?.type ?? null)
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
          {Reactions.map((reaction) => (
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
