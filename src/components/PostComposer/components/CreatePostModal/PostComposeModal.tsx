import { type Audience, type AudienceRecord, type CreatePostModalProps, type ModalView } from '../../types'
import type { createPostPayload, QoutePayloadType } from '../../../../types/post.types'
import { useEffect, useState } from 'react'
import { addPostIcons } from '../../consts/styles'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { Form } from 'antd'
import { X, ChevronDown, Smile, Globe, Users } from 'lucide-react'
import { TypePost } from '../../../../constants/enum'
import { REGEX_HASHTAG } from '../../../../utils/regex'
import { notificationError, notificationSuccess } from '../../../../config/notify'
import useUserStore from '../../../../store/useUserStore'
import usePostStore from '../../../../store/usePostStore'
import AudiencePost from './PostAudienceModal'
import PostAuthorInfo from '../../../PostCard/components/PostAuthorInfo'

const audienceConfig: AudienceRecord = {
  every_one: {
    label: 'Công khai',
    icon: Globe,
    description: 'Bất kỳ ai ở trên hoặc ngoài Facebook'
  },
  fynx_circle: {
    label: 'Bạn bè',
    icon: Users,
    description: 'Bạn bè của bạn trên Facebook'
  }
}

const PostCompose = ({ isOpen, onClose, parent_post_id, parentPost }: CreatePostModalProps) => {
  const { me, profileUser } = useUserStore()
  const [content, setContent] = useState('')
  const [view, setView] = useState<ModalView>('compose')
  const [audience, setAudience] = useState<Audience>('fynx_circle')
  const [tempAudience, setTempAudience] = useState<Audience>('fynx_circle')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [form] = Form.useForm()
  const { createPost, getPostsByAuthorId, qoutePost } = usePostStore()

  useEffect(() => {
    form.setFieldsValue({
      type: TypePost.Post,
      content: content,
      audience: audience
    })
  }, [content])

  useEffect(() => {
    if (!isOpen) {
      setView('compose')
      setDirection('forward')
      setShowEmojiPicker(false)
      setContent('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const hasContent = content.trim().length > 0
  const selectedAudience = audienceConfig[audience]
  const SelectedIcon = selectedAudience.icon

  const openAudienceView = () => {
    setTempAudience(audience)
    setDirection('forward')
    setView('audience')
  }

  const goToCompose = () => {
    setDirection('back')
    setView('compose')
  }

  const handleAudienceDone = () => {
    setAudience(tempAudience)
    goToCompose()
  }

  const handleAudienceBack = () => {
    setTempAudience(audience)
    goToCompose()
  }

  const renderContent = (text: string) => {
    return text.split(REGEX_HASHTAG).map((part, index) =>
      part.startsWith('#') ? (
        <span key={index} className='text-blue-500'>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    )
  }

  const handleCreatePost = async (value: createPostPayload) => {
    const hashtags = value.content.split(' ').filter((item) => item.includes('#') && item.startsWith('#'))
    const content = value.content
      .split(' ')
      .filter((item) => !item.includes('#'))
      .join('')
    const payloadPost = {
      type: 0,
      content,
      hashtags,
      parent_id: null,
      audience: audience === 'every_one' ? 0 : audience === 'fynx_circle' ? 1 : 2,
      medias: [],
      mentions: []
    }
    const payloadQoutePost: QoutePayloadType = {
      hashtags,
      content,
      mentions: [],
      medias: []
    }
    const result = parent_post_id ? await qoutePost(parent_post_id, payloadQoutePost) : await createPost(payloadPost)
    if (result.success) {
      notificationSuccess(result.message as string)
      onClose()
      await getPostsByAuthorId({
        page: 1,
        page_size: 5,
        author_id: profileUser._id as string
      })
    } else {
      notificationError(result.message as string)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-white/80 animate-backdrop-in' onClick={onClose} />

      <div className='relative w-full max-w-125 bg-white rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.2)] animate-modal-in overflow-hidden'>
        {view === 'compose' ? (
          // Compose
          <Form
            form={form}
            onFinish={handleCreatePost}
            autoComplete='false'
            className={direction === 'back' ? 'animate-slide-in-left' : ''}
          >
            {/* Header */}
            <div className='flex items-center justify-center p-4 border-b border-gray-200 relative'>
              <h2 className='text-xl font-bold'>Tạo bài viết</h2>
              <button
                onClick={onClose}
                className='cursor-pointer absolute right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200'
              >
                <X className='w-5 h-5 text-gray-600' />
              </button>
            </div>

            {/* Body */}
            <div className='p-4'>
              <div className='flex items-center gap-3 mb-2'>
                <img
                  src={me.avatar || '/avatar-mac-dinh.jpg'}
                  alt='avatar'
                  className='w-10 h-10 rounded-full object-cover border border-gray-200'
                />
                <div>
                  <div className='font-semibold text-[15px]'>{me.first_name + ' ' + me.last_name}</div>
                  <button
                    onClick={openAudienceView}
                    className='cursor-pointer flex items-center gap-1 bg-[#E4E6EB] hover:bg-[#D8DADF] px-2 py-1 rounded-md text-[13px] font-semibold text-gray-800 mt-0.5 transition-colors duration-200'
                  >
                    <SelectedIcon className='w-3 h-3' />
                    {selectedAudience.label}
                    <ChevronDown className='w-3 h-3' />
                  </button>
                </div>
              </div>

              <Form.Item name='content'>
                {/* Hiển thị màu */}
                <div className='absolute inset-0 whitespace-pre-wrap wrap-break-word pointer-events-none'>
                  {renderContent(content)}
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Bạn đang nghĩ gì?'
                  className='relative bg-transparent text-transparent caret-black w-full outline-none resize-none min-h-37.5 placeholder-gray-500'
                  autoFocus
                />

                <div className='flex items-center justify-between mt-1'>
                  <button className='cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-500 text-white font-bold text-sm shadow hover:opacity-90 transition-opacity duration-200'>
                    Aa
                  </button>
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
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                      className='cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full'
                    >
                      <Smile className='w-6 h-6' />
                    </button>
                  </div>
                </div>
              </Form.Item>

              {parentPost && (
                <div className='mb-3 overflow-hidden rounded-xl border border-gray-300 p-4'>
                  <PostAuthorInfo post={parentPost} />
                  <p className='mt-3 whitespace-pre-wrap wrap-break-word text-[15px] leading-5 text-gray-900'>
                    {parentPost.content}
                  </p>
                  {parentPost.hashtags && parentPost.hashtags.length > 0 && (
                    <div className='mt-1 flex flex-wrap gap-1 text-[15px] text-blue-500'>
                      {parentPost.hashtags.map((hashtag) => (
                        <span key={hashtag._id}>{hashtag.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className='flex items-center justify-between mt-3 px-3 py-2.5 border border-gray-300 rounded-lg'>
                <span className='font-semibold text-[15px]'>Thêm vào bài viết của bạn</span>
                <div className='flex items-center gap-0.5'>
                  {addPostIcons.map(({ icon: Icon, color }, index) => (
                    <button
                      key={index}
                      className='cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!hasContent}
                className={`w-full mt-3 py-2.5 rounded-lg font-semibold text-[15px] transition-colors duration-200 ${
                  hasContent
                    ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                    : 'bg-[#E4E6EB] text-gray-500 cursor-not-allowed'
                }`}
              >
                Đăng bài viết
              </button>
            </div>
          </Form>
        ) : (
          // PostAudienceModal
          <AudiencePost
            audienceConfig={audienceConfig}
            handleAudienceBack={handleAudienceBack}
            handleAudienceDone={handleAudienceDone}
            setTempAudience={setTempAudience}
            tempAudience={tempAudience}
          />
        )}
      </div>
    </div>
  )
}

export default PostCompose
