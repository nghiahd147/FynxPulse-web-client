import { Ellipsis, Gift, Search, Video } from 'lucide-react'

const ActiveUsersSidebar = () => {
  const userItemClass =
    'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-gray-200'

  return (
    <aside className='hide-scrollbar sticky top-0 hidden h-[calc(100vh-4rem)] w-80 shrink-0 overflow-y-auto border-l border-borderPrimary bg-white px-4 py-4 xl:block'>
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
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-200'
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
