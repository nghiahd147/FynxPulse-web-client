import { Camera, Heart, MessageCircle, MoreHorizontal, Send, Smile, Sticker, X } from 'lucide-react'
import { useState } from 'react'
import PostAuthorInfo from './PostAuthorInfo'
import PostOptionsMenu from './PostOptionsMenu'
import type { Posts } from '../../../types/post.types'
import PostReactionButton from './PostReactionButton'
import PostShareButton from './PostShareButton'
import useCommentStore from '../../../store/useCommentStore'
import { notificationError, notificationSuccess } from '../../../config/notify'
import { Dropdown, Spin } from 'antd'

const PostCommentButton = ({ post, count = 0 }: { post: Posts, count?: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")
  const { getComments, createComment, deleteComment, data, loading: { createComment: createCommentLoading } } = useCommentStore()

  const handleCreateComment = async () => {
    const payload = {
      post_id: post._id as string,
      content
    }
    const result = await createComment(payload)
    if (result.success) {
      getComments(post._id as string)
      setContent("")
    } else {
      notificationError(result.message as string || "Có lỗi xảy ra")
    }
  }

  const handleDeleteComment = async (id: string) => {
    const result = await deleteComment(id)
    if (result.success) {
      getComments(post._id as string)
      notificationSuccess(result.message as string)
    } else {
      notificationSuccess(result.message as string)
    }
  }

  return (
    <>
      <div className='flex items-center gap-1'>
        <button
          type='button'
          onClick={() => {
            setIsOpen(true)
            getComments(post._id as string)
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
              <h2 className='text-[22px] font-bold leading-none tracking-tight text-[#050505]'>Bài viết của {post.user_info.first_name + " " + post.user_info.last_name}</h2>
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
                {/* Comments */}
                {!createCommentLoading ? data && data.map((comment, index) => {
                  return (
                    <div key={index} className='group mb-5 flex items-center gap-3'>
                      <img src={comment.userInfo.avatar || ""} alt='avatar' className='h-8 w-8 rounded-full object-cover' />
                      <div className='rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                        <p className='text-[16px] font-semibold leading-tight'>{comment.userInfo.first_name + " " + comment.userInfo.last_name}</p>
                        <p className='mt-1 text-[16px]'>{comment.content}</p>
                      </div>

                      <Dropdown
                        trigger={['click']}
                        menu={{ items: [{ key: 'delete', label: <span onClick={() => handleDeleteComment(comment._id as string)}>Xóa bình luận</span> }] }}
                      >
                        <button
                          type='button'
                          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#65676B] opacity-0 transition hover:bg-[#F0F2F5] group-hover:opacity-100'
                        >
                          <MoreHorizontal className='h-5 w-5' />
                        </button>
                      </Dropdown>
                    </div>
                  )
                }) : <Spin />}
              </div>
            </div>

            <div className='border-t border-gray-200 px-5 py-3'>
              <div className='flex items-start gap-2'>
                <img
                  src={post.user_info.avatar || ""}
                  alt='my-avatar'
                  className='mb-1 h-8 w-8 shrink-0 rounded-full object-cover'
                />
                <div className='flex-1 rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                  <input
                    type='text'
                    placeholder='Viết bình luận...'
                    className='w-full bg-transparent text-[15px] outline-none placeholder:text-[#65676B]'
                    onChange={(e) => setContent(e.target.value)}
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
                    <button onClick={handleCreateComment} type='button' className={`cursor-pointer rounded-full p-1.5 ${content ? 'text-[#789ec5] hover:bg-[#aebee7] transition-all ease-in' : 'text-[#BCC0C4] hover:bg-[#E4E6EB]} transition-all ease-in'}`}>
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
