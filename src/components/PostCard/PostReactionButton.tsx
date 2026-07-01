import { useState } from 'react'
import { Heart, ThumbsUp } from 'lucide-react'

type ReactionId = 'like' | 'heart' | 'haha' | 'wow' | 'sad'

const REACTIONS: {
  id: ReactionId
  label: string
  activeText: string
  emoji: string
}[] = [
  { id: 'like', label: 'Thích', activeText: 'text-[#1877F2]', emoji: '👍' },
  { id: 'heart', label: 'Yêu thích', activeText: 'text-[#F33E58]', emoji: '❤️' },
  { id: 'haha', label: 'Haha', activeText: 'text-[#F7B125]', emoji: '😂' },
  { id: 'wow', label: 'Wow', activeText: 'text-[#F7B125]', emoji: '😮' },
  { id: 'sad', label: 'Buồn', activeText: 'text-[#F7B125]', emoji: '😢' }
]

const ReactionPickerIcon = ({ id, emoji }: { id: ReactionId; emoji: string }) => {
  if (id === 'like') {
    return (
      <span className='flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] shadow-sm cursor-pointer'>
        <ThumbsUp className='h-5 w-5 fill-white text-white' strokeWidth={0} />
      </span>
    )
  }

  if (id === 'heart') {
    return (
      <span className='flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-b from-[#ff6a88] to-[#f33e58] shadow-sm cursor-pointer'>
        <Heart className='h-5 w-5 fill-white text-white' strokeWidth={0} />
      </span>
    )
  }

  return (
    <span className='flex h-11 w-11 items-center justify-center text-[2.25rem] leading-none select-none cursor-pointer'>
      {emoji}
    </span>
  )
}

const ActiveReactionIcon = ({ id }: { id: ReactionId }) => {
  const reaction = REACTIONS.find((reaction) => reaction.id === id)!

  if (id === 'like') {
    return <ThumbsUp className='h-5 w-5 fill-[#1877F2] text-[#1877F2]' strokeWidth={0} />
  }

  if (id === 'heart') {
    return <Heart className='h-5 w-5 fill-[#F33E58] text-[#F33E58]' strokeWidth={0} />
  }

  return <span className='text-xl leading-none'>{reaction.emoji}</span>
}

const PostReactionButton = () => {
  const [active, setActive] = useState<ReactionId | null>(null)
  const [hover, setHover] = useState(false)

  const activeReaction = REACTIONS.find((reaction) => reaction.id === active)

  const handlePick = (id: ReactionId) => {
    setActive((prev) => (prev === id ? null : id))
    setHover(false)
  }

  return (
    <div
      className='relative flex cursor-pointer items-center gap-1'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute bottom-full left-0 z-20 pb-3 transition-all duration-200 origin-bottom-left ${
          hover
            ? 'pointer-events-auto scale-100 opacity-100 translate-y-0'
            : 'pointer-events-none scale-95 opacity-0 translate-y-1'
        }`}
      >
        <div className='flex cursor-pointer items-center gap-3 rounded-full border border-[#E4E6EB] bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)]'>
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.id}
              type='button'
              title={reaction.label}
              onClick={() => handlePick(reaction.id)}
              className='cursor-pointer rounded-full transition-transform duration-200 hover:scale-125 active:scale-110'
            >
              <ReactionPickerIcon id={reaction.id} emoji={reaction.emoji} />
            </button>
          ))}
        </div>
      </div>

      <button
        type='button'
        onClick={() => handlePick('like')}
        className={`flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors ${
          active ? activeReaction?.activeText : 'text-[#65676B] hover:bg-[#F2F2F2]'
        }`}
      >
        {active ? <ActiveReactionIcon id={active} /> : <ThumbsUp className='h-5 w-5' strokeWidth={2} />}
        {active && <span className='text-sm font-semibold'>{activeReaction?.label}</span>}
      </button>
      <span className='text-sm font-medium text-[#65676B]'>1</span>
    </div>
  )
}

export default PostReactionButton
