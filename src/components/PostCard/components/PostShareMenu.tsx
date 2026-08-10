import { useState } from 'react'
import { PenLine, Repeat2 } from 'lucide-react'
import type { Posts } from '../../../types/post.types'
import useUserStore from '../../../store/useUserStore'

const PostShareMenu = ({
  isPost,
  isRepost,
  isQuote,
  post_children
}: {
  isPost: boolean
  isRepost: boolean
  isQuote: boolean
  post_children?: Posts[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { me } = useUserStore()
  const isSharePost = post_children?.map((item) => item._id === me._id)
  return (
    <div className='relative flex items-center gap-1'>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='menu'
        onClick={() => setIsOpen((open) => !open)}
        className='cursor-pointer flex items-center rounded-md px-1.5 py-1 text-[#65676B] transition-colors hover:bg-[#F2F2F2]'
      >
        <Repeat2
          className={`h-5 w-5 shrink-0 ${isSharePost && isPost ? 'text-blue-500' : 'text-gray-500'}`}
          strokeWidth={2}
        />
      </button>
      {post_children && <span className='text-sm font-medium text-[#65676B]'>{post_children.length}</span>}
      <div
        role='menu'
        className={`absolute bottom-full left-0 z-20 mb-2 w-45 origin-bottom-left overflow-hidden rounded-xl bg-white py-1 text-blue-500 shadow-xl ring-1 ring-black/5 transition-all duration-150 ease-out ${
          isOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-1 scale-95 opacity-0'
        }`}
      >
        <button
          type='button'
          role='menuitem'
          className='flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-[16px] font-semibold transition-colors hover:bg-blue-50'
        >
          <Repeat2 className={`h-5 w-5 shrink-0`} strokeWidth={2} />
          <span>{isRepost || isQuote ? 'Undo Repost' : 'Repost'}</span>
        </button>
        <button
          type='button'
          role='menuitem'
          className='flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-[16px] font-semibold transition-colors hover:bg-blue-50'
        >
          <PenLine className='h-5 w-5 shrink-0' strokeWidth={2} />
          <span>Quote</span>
        </button>
      </div>
    </div>
  )
}

export default PostShareMenu
