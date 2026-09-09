import { Bookmark, Bot, Clapperboard, Clock3, Home, Users, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import useUserStore from '../../store/useUserStore'

const MainSidebar = () => {
  const { me } = useUserStore()
  const menuItemClass =
    'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left text-gray-900 transition-colors hover:bg-gray-200'

  return (
    <aside className='hide-scrollbar sticky top-0 hidden h-[calc(100vh-4rem)] w-75 shrink-0 overflow-y-auto border-r border-borderPrimary bg-white px-4 py-4 lg:block xl:w-80'>
      <nav aria-label='Điều hướng chính' className='space-y-1'>
        <Link to='/profile' className={menuItemClass}>
          <img
            src={me.avatar || './avatar-mac-dinh.jpg'}
            alt='Ảnh đại diện'
            className='h-10 w-10 shrink-0 rounded-full border border-gray-300 object-cover'
          />
          <span className='truncate font-semibold'>{me.first_name + ' ' + me.last_name}</span>
        </Link>

        <button type='button' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
            <Bot size={25} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Fynx AI</span>
        </button>

        <Link to='/friends' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <Users size={25} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Bạn bè</span>
        </Link>

        <Link to='/' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600'>
            <Home size={24} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Bảng tin</span>
        </Link>

        <button type='button' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600'>
            <Clock3 size={25} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Kỷ niệm</span>
        </button>

        <button type='button' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600'>
            <Bookmark size={24} fill='currentColor' strokeWidth={1.8} />
          </span>
          <span className='font-semibold'>Đã lưu</span>
        </button>

        <button type='button' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <UsersRound size={25} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Nhóm</span>
        </button>

        <Link to='/reels' className={menuItemClass}>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#dd2c00]'>
            <Clapperboard size={24} strokeWidth={2.2} />
          </span>
          <span className='font-semibold'>Thước phim</span>
        </Link>
      </nav>

      <div className='mx-2 my-4 border-t border-gray-300' />

      <section aria-labelledby='shortcut-title'>
        <h2 id='shortcut-title' className='mb-2 px-2 text-base font-semibold text-gray-500'>
          Lối tắt của bạn
        </h2>

        <button type='button' className={menuItemClass}>
          <img src='/icons8-yelp.png' alt='' className='h-10 w-10 shrink-0 rounded-lg object-cover' />
          <span className='truncate font-semibold'>Cộng đồng Fynx</span>
        </button>

        <button type='button' className={menuItemClass}>
          <img src='/anh_nen_mac_dinh_2.jpg' alt='' className='h-10 w-10 shrink-0 rounded-lg object-cover' />
          <span className='truncate font-semibold'>Chia sẻ khoảnh khắc</span>
        </button>
      </section>
    </aside>
  )
}

export default MainSidebar
