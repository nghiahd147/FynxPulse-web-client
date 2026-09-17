import { Ellipsis, Gift, Globe2, Search, UsersRound, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import usePostStore from '../../store/usePostStore'

const ActiveUsersSidebar = () => {
  const { setNewPost, isPublic } = usePostStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const userItemClass =
    'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-gray-200'

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  return (
    <aside className='hide-scrollbar sticky top-0 hidden h-[calc(100vh-4rem)] w-80 shrink-0 overflow-y-auto border-l border-borderPrimary bg-white px-4 py-4 xl:block'>
      <section aria-labelledby='timeline-title'>
        <h2 id='timeline-title' className='mb-3 text-[17px] font-bold text-gray-900'>
          Dòng thời gian
        </h2>

        <div className='grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm'>
          <button
            type='button'
            aria-pressed='true'
            className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-white px-2 ${isPublic === 'true' ? 'text-[#1d9bf0]' : 'text-gray-500'} shadow-sm transition-colors`}
            onClick={() => setNewPost('true')}
          >
            <Globe2 size={20} strokeWidth={2.25} />
            <span className='text-[13px] font-semibold'>Công khai</span>
          </button>

          <button
            type='button'
            aria-pressed='false'
            className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg px-2 ${isPublic === 'false' ? 'text-[#1d9bf0]' : 'text-gray-500'} transition-colors hover:bg-white hover:text-gray-900`}
            onClick={() => setNewPost('false')}
          >
            <UsersRound size={20} strokeWidth={2.25} />
            <span className='text-[13px] font-semibold'>Đang theo dõi</span>
          </button>
        </div>
      </section>

      <div className='my-4 border-t border-gray-300' />

      <section aria-labelledby='birthday-title'>
        <h2 id='birthday-title' className='mb-2 text-[17px] font-semibold text-gray-500'>
          Sinh nhật
        </h2>

        <button
          type='button'
          className='flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-left transition-colors hover:bg-gray-200'
        >
          <Gift size={32} className='shrink-0 text-[#dd2c00]' strokeWidth={2} />
          <span className='text-[15px] leading-5 text-gray-800'>
            Hôm nay là sinh nhật của <strong>Nguyễn Minh</strong>.
          </span>
        </button>
      </section>

      <div className='my-3 border-t border-gray-300' />

      <section aria-labelledby='contacts-title'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 id='contacts-title' className='text-[17px] font-semibold text-gray-500'>
            Người liên hệ
          </h2>

          <div className='flex items-center gap-1'>
            <button
              type='button'
              aria-label='Tạo phòng họp mặt'
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-200'
            >
              <Video size={20} />
            </button>
            <button
              type='button'
              aria-label='Tìm kiếm người liên hệ'
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((value) => !value)}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
                isSearchOpen ? 'bg-blue-50 text-[#1d9bf0]' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Search size={20} />
            </button>
            <button
              type='button'
              aria-label='Tùy chọn người liên hệ'
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-200'
            >
              <Ellipsis size={21} />
            </button>
          </div>
        </div>

        <div
          aria-hidden={!isSearchOpen}
          className={`grid transition-all duration-200 ease-out ${
            isSearchOpen ? 'mb-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='overflow-hidden px-0.5'>
            <label className='group relative block py-0.5'>
              <span className='sr-only'>Tìm kiếm người liên hệ</span>
              <Search
                size={17}
                aria-hidden='true'
                className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#1d9bf0]'
              />
              <input
                ref={searchInputRef}
                type='search'
                tabIndex={isSearchOpen ? 0 : -1}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setIsSearchOpen(false)
                }}
                placeholder='Tìm kiếm người liên hệ'
                className='h-10 w-full rounded-full border border-transparent bg-gray-100 pl-10 pr-4 text-[14px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-500 hover:bg-gray-200/80 focus:border-blue-200 focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,155,240,0.12)]'
              />
            </label>
          </div>
        </div>

        <div className='space-y-1'>
          <button type='button' className={userItemClass}>
            <span className='relative shrink-0'>
              <img src='/avatar-mac-dinh.jpg' alt='Nguyễn An' className='h-9 w-9 rounded-full object-cover' />
              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bgPrimary bg-green-500' />
            </span>
            <span className='truncate text-[15px] font-semibold text-gray-900'>Nguyễn An</span>
          </button>

          <button type='button' className={userItemClass}>
            <span className='relative shrink-0'>
              <img src='/icons8-yelp.png' alt='Quang Nghĩa' className='h-9 w-9 rounded-full object-cover' />
              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bgPrimary bg-green-500' />
            </span>
            <span className='truncate text-[15px] font-semibold text-gray-900'>Quang Nghĩa</span>
          </button>

          <button type='button' className={userItemClass}>
            <span className='relative shrink-0'>
              <img src='/avatar-mac-dinh.jpg' alt='Trần Minh Anh' className='h-9 w-9 rounded-full object-cover' />
              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bgPrimary bg-green-500' />
            </span>
            <span className='truncate text-[15px] font-semibold text-gray-900'>Trần Minh Anh</span>
          </button>

          <button type='button' className={userItemClass}>
            <span className='relative shrink-0'>
              <img src='/icons8-yelp.png' alt='Lê Hoàng' className='h-9 w-9 rounded-full object-cover' />
              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bgPrimary bg-green-500' />
            </span>
            <span className='truncate text-[15px] font-semibold text-gray-900'>Lê Hoàng</span>
          </button>

          <button type='button' className={userItemClass}>
            <span className='relative shrink-0'>
              <img src='/avatar-mac-dinh.jpg' alt='Phạm Thanh' className='h-9 w-9 rounded-full object-cover' />
              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bgPrimary bg-green-500' />
            </span>
            <span className='truncate text-[15px] font-semibold text-gray-900'>Phạm Thanh</span>
          </button>
        </div>
      </section>

      <div className='my-3 border-t border-gray-300' />

      <section aria-labelledby='groups-title'>
        <h2 id='groups-title' className='mb-2 text-[17px] font-semibold text-gray-500'>
          Cuộc trò chuyện nhóm
        </h2>

        <button type='button' className={userItemClass}>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-2xl text-gray-700'>
            +
          </span>
          <span className='text-[15px] font-semibold text-gray-900'>Tạo nhóm mới</span>
        </button>
      </section>
    </aside>
  )
}

export default ActiveUsersSidebar
