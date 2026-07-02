import { Camera, Heart, MessageCircle, Send, Smile, Sticker, X } from 'lucide-react'
import { useState } from 'react'
import PostAuthorInfo from './PostAuthorInfo'
import PostOptionsMenu from './PostOptionsMenu'
import type { Posts } from '../../types/post.types'
import PostReactionButton from './PostReactionButton'
import PostShareButton from './PostShareButton'

const PostCommentButton = ({ post, count = 0 }: { post: Posts, count?: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div className='flex items-center gap-1'>
        <button
          type='button'
          onClick={() => setIsOpen(true)}
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
              <h2 className='text-[22px] font-bold leading-none tracking-tight text-[#050505]'>Bài viết của Nghĩa</h2>
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
                  <PostReactionButton post_id={post._id || ""} like_count={post.like_count || 0} />
                  <PostShareButton />
                </div>
                <div className='flex items-center'>
                  <Heart className='w-5 h-5 fill-red-500 text-red-500' />
                </div>
              </div>

              <div className='mt-5'>
                <p className='mb-4 text-[20px] font-bold text-gray-600'>Phù hợp nhất</p>
                <div className='mb-5 flex gap-3'>
                  <img src='/avatar-mac-dinh.jpg' alt='avatar' className='h-8 w-8 rounded-full object-cover' />
                  <div className='rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                    <p className='text-[16px] font-semibold leading-tight'>Quang Nghĩa</p>
                    <p className='mt-1 text-[16px]'>🎂</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 px-5 py-3'>
              <div className='flex items-start gap-2'>
                <img
                  src='/avatar-mac-dinh.jpg'
                  alt='my-avatar'
                  className='mb-1 h-8 w-8 shrink-0 rounded-full object-cover'
                />
                <div className='flex-1 rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                  <input
                    type='text'
                    placeholder='Viết bình luận...'
                    className='w-full bg-transparent text-[15px] outline-none placeholder:text-[#65676B]'
                  />
                  <div className='mt-1 flex items-center justify-between'>
                    <div className='flex items-center gap-0.5 text-[#65676B]'>
                      <button type='button' className='cursor-pointer rounded-full p-1.5 hover:bg-[#E4E6EB]'>
                        <Smile className='h-5 w-5' strokeWidth={1.75} />
                      </button>
                      <button type='button' className='cursor-pointer rounded-full p-1.5 hover:bg-[#E4E6EB]'>
                        <Smile className='h-5 w-5' strokeWidth={1.75} />
                      </button>
                      <button type='button' className='cursor-pointer rounded-full p-1.5 hover:bg-[#E4E6EB]'>
                        <Camera className='h-5 w-5' strokeWidth={1.75} />
                      </button>
                      <button
                        type='button'
                        className='cursor-pointer rounded-md px-1.5 py-1 text-[11px] font-bold leading-none hover:bg-[#E4E6EB]'
                      >
                        GIF
                      </button>
                      <button type='button' className='cursor-pointer rounded-full p-1.5 hover:bg-[#E4E6EB]'>
                        <Sticker className='h-5 w-5' strokeWidth={1.75} />
                      </button>
                    </div>
                    <button type='button' className='cursor-pointer rounded-full p-1.5 text-[#BCC0C4] hover:bg-[#E4E6EB]'>
                      <Send className='h-5 w-5' strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostCommentButton
