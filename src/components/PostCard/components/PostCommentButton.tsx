import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import PostAuthorInfo from './PostAuthorInfo'
import PostOptionsMenu from './PostOptionsMenu'
import type { Posts } from '../../../types/post.types'
import PostReactionButton from './PostReactionButton'
import PostShareButton from './PostShareButton'
import CommentForm from '../../CommentForm/CommentForm'
import PostReactionTotal from './PostReactionTotal'

const PostCommentButton = ({ post, count = 0 }: { post: Posts; count?: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className='flex items-center gap-1'>
        <button
          type='button'
          onClick={() => {
            setIsOpen(true)
          }}
          className='cursor-pointer flex items-center rounded-md px-1.5 py-1 text-[#65676B] transition-colors hover:bg-[#F2F2F2]'
        >
          <MessageCircle className='h-5 w-5' strokeWidth={2} />
        </button>
        <span className='text-sm font-medium text-[#65676B]'>{count}</span>
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-3 animate-backdrop-in'>
          <div className='w-full max-w-3xl rounded-2xl bg-white shadow-xl animate-modal-in'>
            <div className='relative flex items-center justify-center border-b border-[#DADDE1] px-6 py-4 text-center'>
              <h2 className='text-[22px] font-bold leading-none tracking-tight text-[#050505]'>
                Bài viết của {post.user_info.first_name + ' ' + post.user_info.last_name}
              </h2>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                aria-label='Đóng'
                className='absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#E4E6EB] text-[#1C1E21] transition-colors hover:bg-[#D8DADF]'
              >
                <X className='h-4 w-4' strokeWidth={2.5} />
              </button>
            </div>

            <div className='px-5 py-4'>
              <div className='flex items-start justify-between'>
                <PostAuthorInfo post={post} />
                <PostOptionsMenu idPost={post._id || ''} isModalPost={isOpen} setIsOpenModal={setIsOpen} />
              </div>

              <p className='mt-3 text-[22px] leading-tight font-normal'>{post.content}</p>

              <div className='mt-3 flex items-center justify-between text-gray-600'>
                <div className='flex items-center gap-3'>
                  <PostReactionButton post_id={post._id || ''} like_count={post.like_count || 0} />
                  <PostShareButton />
                </div>
                <div className='flex items-center'>
                  <PostReactionTotal post={post} />
                </div>
              </div>
            </div>
            <CommentForm post={post} isModal={true} />
          </div>
        </div>
      )}
    </>
  )
}

export default PostCommentButton
