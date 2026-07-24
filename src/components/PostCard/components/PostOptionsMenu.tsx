import { Popover } from 'antd'
import { BellOff, Bookmark, Ellipsis, MessageCircleWarning, Trash2, XSquare } from 'lucide-react'
import usePostStore from '../../../store/usePostStore'
import { notificationError, notificationSuccess } from '../../../config/notify'
import useUserStore from '../../../store/useUserStore'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import useBookmarkStore from '../../../store/useBookmarkStore'

const PostOptionsMenu = ({
  idPost,
  isModalPost,
  setIsOpenModal
}: {
  idPost: string
  isModalPost?: boolean
  setIsOpenModal?: Dispatch<SetStateAction<boolean>>
}) => {
  const { getPostsByAuthorId, deletePost } = usePostStore()
  const { profileUser, me } = useUserStore()
  const { status, getStatusBookmark, addBookmark, unBookmark } = useBookmarkStore()
  const isOwnProfile = me._id === profileUser._id
  const item = 'flex gap-3 rounded-lg p-2 cursor-pointer hover:bg-[#F2F2F2] transition-colors'
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    if (isPopoverOpen == true) {
      getStatusBookmark(idPost)
    }
  }, [idPost, isPopoverOpen])

  const handleUpdateStatus = async () => {
    const updateStatus = status ? unBookmark(idPost) : addBookmark(idPost)
    const result = await updateStatus
    if (result.success) {
      getStatusBookmark(idPost)
      notificationSuccess(result.message as string)
    } else {
      notificationError(result.message as string)
    }
  }

  const menu = (
    <div className='w-87'>
      <div className={`${item} items-start`} onClick={handleUpdateStatus}>
        <Bookmark
          className={`mt-0.5 h-6 w-6 shrink-0 text-[#050505] ${status === false ? 'text-[#050505]' : 'text-blue-400'}`}
        />
        <div>
          <p className={`text-[15px] font-semibold ${status === false ? 'text-[#050505]' : 'text-blue-400'} `}>
            {status === false ? 'Lưu bài viết' : 'Đã lưu'}
          </p>
          <p className={`mt-1 text-[13px] leading-tight ${status === false ? 'text-[#65676B]' : 'text-blue-400'}`}>
            {status === false ? 'Thêm vào danh sách mục đã lưu.' : 'Đã lưu vào danh sách mục đã lưu.'}
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <>
          <div className='my-1 border-t border-[#CED0D4]' />
          <div className={`${item} items-center`} onClick={() => handleDeletePost(idPost)}>
            <Trash2 className='h-6 w-6 shrink-0 text-[#050505]' />
            <p className='text-[15px] font-semibold text-[#050505]'>Xóa bài viết</p>
          </div>
          <div className={`${item} items-center`}>
            <BellOff className='h-6 w-6 shrink-0 text-[#050505]' />
            <p className='text-[15px] font-semibold text-[#050505]'>Tắt thông báo về bài viết này</p>
          </div>
          <div className={`${item} items-start`}>
            <XSquare className='mt-0.5 h-6 w-6 shrink-0 text-[#050505]' />
            <div>
              <p className='text-[15px] font-semibold text-[#050505]'>Ẩn khỏi trang cá nhân</p>
              <p className='mt-1 text-[13px] leading-tight text-[#65676B]'>
                Bài viết này có thể vẫn xuất hiện ở các nơi khác.
              </p>
            </div>
          </div>
        </>
      )}

      <div className='my-1 border-t border-[#CED0D4]' />

      <div className={`${item} items-start`}>
        <MessageCircleWarning className='mt-0.5 h-6 w-6 shrink-0 text-[#050505]' />
        <div>
          <p className='text-[15px] font-semibold text-[#050505]'>Báo cáo bài viết</p>
          <p className='mt-1 text-[13px] leading-tight text-[#65676B]'>
            Chúng tôi sẽ không cho người đăng biết ai đã báo cáo.
          </p>
        </div>
      </div>
    </div>
  )

  const handleDeletePost = async (id: string) => {
    const result = await deletePost(id)
    if (result.success) {
      getPostsByAuthorId(profileUser._id as string)
      notificationSuccess(result.message as string)
      if (isModalPost) {
        setIsOpenModal?.(false)
      }
    } else {
      notificationError(result.message as string)
    }
  }

  return (
    <Popover
      content={menu}
      trigger='click'
      placement='bottomRight'
      arrow={{ pointAtCenter: true }}
      onOpenChange={(open) => {
        setIsPopoverOpen(open)
      }}
      getPopupContainer={() => document.body}
      overlayClassName='post-options-popover'
      overlayInnerStyle={{
        padding: 8,
        borderRadius: 8,
        boxShadow: '0 12px 28px rgba(0,0,0,0.2)'
      }}
    >
      <button
        type='button'
        className='cursor-pointer rounded-full p-1.5 text-[#65676B] transition-colors hover:bg-[#F2F2F2]'
      >
        <Ellipsis className='h-5 w-5' />
      </button>
    </Popover>
  )
}

export default PostOptionsMenu
