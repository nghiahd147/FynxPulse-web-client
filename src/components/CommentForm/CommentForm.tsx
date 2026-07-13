import { Camera, MoreHorizontal, Send, Smile, Sticker } from 'lucide-react'
import { notificationError, notificationSuccess } from '../../config/notify'
import useUserStore from '../../store/useUserStore'
import usePostStore from '../../store/usePostStore'
import useCommentStore from '../../store/useCommentStore'
import { useEffect, useState } from 'react'
import type { Posts } from '../../types/post.types'
import { Dropdown, Spin } from 'antd'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'

const CommentForm = ({ post, isModal }: { post: Posts; isModal: boolean }) => {
  const { profileUser, me } = useUserStore()
  const { getPostsByAuthorId } = usePostStore()
  const [content, setContent] = useState<string>('')
  const { getComments, createComment, deleteComment, data, loading } = useCommentStore()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const postId = post._id as string
  const comments = data || []
  const commentsLoading = loading.getComments

  useEffect(() => {
    if (postId) getComments(postId)
  }, [getComments, postId])

  const handleDeleteComment = async (id: string) => {
    const result = await deleteComment(id)
    if (result.success) {
      getComments(post._id as string)
      notificationSuccess(result.message as string)
    } else {
      notificationError(result.message as string)
    }
  }

  const handleCreateComment = async () => {
    const payload = {
      post_id: post._id as string,
      content
    }
    const result = await createComment(payload)
    if (result.success) {
      getComments(post._id as string)
      getPostsByAuthorId(profileUser._id as string)
      setContent('')
    } else {
      notificationError((result.message as string) || 'Có lỗi xảy ra')
    }
  }
  return (
    <>
      <div className={`mt-5 mx-5 overflow-y-scroll ${isModal && 'h-75'}`}>
        {isModal == true && <p className='mb-4 text-[20px] font-bold text-gray-600'>Phù hợp nhất</p>}
        {/* Comments */}
        {!commentsLoading ? (
          comments.length > 0 ? (
            <>
              {comments.map((comment, index) => {
                if (isModal === false && comment.post_id === post._id && comment.author_id === me._id) {
                  return (
                    <div key={index} className='group mb-5 flex items-center gap-3'>
                      <img
                        src={comment.userInfo.avatar || ''}
                        alt='avatar'
                        className='h-8 w-8 rounded-full object-cover'
                      />
                      <div className='rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                        <p className='text-[16px] font-semibold leading-tight'>
                          {comment.userInfo.first_name + ' ' + comment.userInfo.last_name}
                        </p>
                        <p className='mt-1 text-[16px]'>{comment.content}</p>
                      </div>

                      <Dropdown
                        trigger={['click']}
                        menu={{
                          items: [
                            {
                              key: 'delete',
                              label: (
                                <span onClick={() => handleDeleteComment(comment._id as string)}>Xóa bình luận</span>
                              )
                            }
                          ]
                        }}
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
                } else if (isModal === true) {
                  return (
                    <div key={index} className='group mb-5 flex items-center gap-3'>
                      <img
                        src={comment.userInfo.avatar || ''}
                        alt='avatar'
                        className='h-8 w-8 rounded-full object-cover'
                      />
                      <div className='rounded-3xl bg-[#F0F2F5] px-3 py-2'>
                        <p className='text-[16px] font-semibold leading-tight'>
                          {comment.userInfo.first_name + ' ' + comment.userInfo.last_name}
                        </p>
                        <p className='mt-1 text-[16px]'>{comment.content}</p>
                      </div>

                      <Dropdown
                        trigger={['click']}
                        menu={{
                          items: [
                            {
                              key: 'delete',
                              label: (
                                <span onClick={() => handleDeleteComment(comment._id as string)}>Xóa bình luận</span>
                              )
                            }
                          ]
                        }}
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
                }
              })}
            </>
          ) : (
            <></>
          )
        ) : (
          <Spin />
        )}
      </div>
      <div className='border-t border-gray-200 px-5 py-3'>
        <div className='flex items-start gap-2'>
          <img
            src={post.user_info.avatar || ''}
            alt='my-avatar'
            className='mb-1 h-8 w-8 shrink-0 rounded-full object-cover'
          />
          <div className='flex-1 rounded-3xl bg-[#F0F2F5] px-3 py-2'>
            <input
              type='text'
              placeholder='Viết bình luận...'
              className='w-full bg-transparent text-[15px] outline-none placeholder:text-[#65676B]'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className='mt-1 flex items-center justify-between'>
              <div className='flex items-center gap-0.5 text-[#65676B]'>
                <div className='relative'>
                  {showEmojiPicker && (
                    <div className='absolute bottom-full right-0 mb-2 z-50'>
                      <EmojiPicker
                        emojiStyle={EmojiStyle.NATIVE}
                        onEmojiClick={(emoji) => setContent((prev) => prev + emoji.emoji)}
                      />
                    </div>
                  )}
                  <button
                    type='button'
                    className='cursor-pointer rounded-full p-1.5 hover:bg-[#E4E6EB]'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className='h-5 w-5' strokeWidth={1.75} />
                  </button>
                </div>
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
              <button
                onClick={handleCreateComment}
                type='button'
                className={`cursor-pointer rounded-full p-1.5 ${content ? 'text-[#789ec5] hover:bg-[#aebee7] transition-all ease-in' : 'text-[#BCC0C4] hover:bg-[#E4E6EB]} transition-all ease-in'}`}
              >
                <Send className='h-5 w-5' strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentForm
