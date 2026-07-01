import { Film, Images, Video } from 'lucide-react'
import { useState } from 'react'
import useUserStore from '../../store/useUserStore'
import CreatePostModal from './components/CreatePostModal/PostComposeModal'
import { message } from 'antd'

const PostComposer = () => {
  const { me } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div className='flex items-center gap-3'>
        <img
          src={me.avatar || '/avatar-mac-dinh.jpg'}
          alt='avatar'
          className='w-10 h-10 rounded-full object-cover border border-gray-200'
        />
        <div
          onClick={() => setIsModalOpen(true)}
          className='flex-1 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200 px-4 py-2.5 rounded-full text-gray-500 text-[15px]'
        >
          Bạn đang nghĩ gì?
        </div>
      </div>
      <div className='h-px bg-gray-200 w-full my-3'></div>
      <div className='flex items-center justify-between px-1'>
        <div
          onClick={() => message.info('Đang phát triển tính năng')}
          className='flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]'
        >
          <Video className='w-6 h-6 text-gray-500' />
          <span>Video trực tiếp</span>
        </div>
        <div className='flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]'>
          <Images className='w-6 h-6 text-gray-500' />
          <span>Ảnh/video</span>
        </div>
        <div
          onClick={() => message.info('Đang phát triển tính năng')}
          className='flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 font-semibold text-[15px]'
        >
          <Film className='w-6 h-6 text-gray-500' />
          <span>Thước phim</span>
        </div>
      </div>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default PostComposer
