import { useState } from 'react'
import { PenLine, Repeat2 } from 'lucide-react'
import type { Posts } from '../../../types/post.types'
import useUserStore from '../../../store/useUserStore'
import usePostStore from '../../../store/usePostStore'
import { notificationError, notificationSuccess } from '../../../config/notify'
import CreatePostModal from '../../PostComposer/components/CreatePostModal/PostComposeModal'

const PostShareMenu = ({
  parentPost,
  post_children,
  post_children_repost,
  post_children_qoute,
  getPost,
  post_id
}: {
  parentPost?: Posts
  post_children?: Posts[]
  post_children_repost?: Posts[]
  post_children_qoute?: Posts[]
  getPost: (pageNumber: number) => Promise<void>
  post_id: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { me } = useUserStore()
  const myRepost = post_children_repost?.find((item) => item.author_id === me._id)
  const myQuote = post_children_qoute?.find((item) => item.author_id === me._id)
  const { repost, undoRepost, undoQoute } = usePostStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRePost = async (post_id: string) => {
    const result = myRepost ? await undoRepost(myRepost?._id as string) : await repost(post_id)
    if (result.success) {
      notificationSuccess(result.message as string)
      setIsOpen(false)
      getPost(1)
    } else {
      notificationError(result.message as string)
    }
  }

  const handleUndoQoute = async () => {
    const result = await undoQoute(myQuote?._id as string)
    if (result.success) {
      notificationSuccess(result.message as string)
      setIsOpen(false)
      getPost(1)
    } else {
      notificationError(result.message as string)
    }
  }

  return (
    <div className='relative flex items-center gap-1'>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='menu'
        onClick={() => setIsOpen((open) => !open)}
        className='cursor-pointer flex items-center rounded-md px-1.5 py-1 text-[#65676B] transition-colors hover:bg-[#F2F2F2]'
      >
        <Repeat2 className={`h-5 w-5 shrink-0 ${myRepost ? 'text-blue-500' : 'text-gray-500'}`} strokeWidth={2} />
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
          onClick={() => handleRePost(post_id)}
        >
          <Repeat2 className={`h-5 w-5 shrink-0`} strokeWidth={2} />
          <span>{myRepost ? 'Undo Repost' : 'Repost'}</span>
        </button>
        <button
          type='button'
          role='menuitem'
          className='flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-[16px] font-semibold transition-colors hover:bg-blue-50'
          onClick={() => {
            if (myQuote) {
              void handleUndoQoute()
            } else {
              setIsModalOpen(true)
            }
          }}
        >
          <PenLine className='h-5 w-5 shrink-0' strokeWidth={2} />
          <span>{myQuote ? 'Undo Qoute' : 'Qoute'}</span>
        </button>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parent_post_id={post_id}
        parentPost={parentPost}
      />
    </div>
  )
}

export default PostShareMenu
