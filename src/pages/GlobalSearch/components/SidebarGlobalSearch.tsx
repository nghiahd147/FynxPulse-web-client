import { FileText, Search, SlidersHorizontal, Users } from 'lucide-react'

const SidebarGlobalSearch = () => {
  return (
    <div className='w-90 border-r border-gray-200 bg-white px-3 py-4'>
      <h1 className='text-xl font-bold'>Kết quả tìm kiếm cho</h1>
      <p className='mt-1 text-sm text-blue-500'>thanh hoa</p>

      <div className='my-4 border-t border-gray-200'></div>

      <div className='mb-3 flex items-center justify-between'>
        <h2 className='font-semibold'>Bộ lọc</h2>
        <span className='cursor-pointer text-sm text-blue-500 hover:underline'>Đặt lại</span>
      </div>

      <div className='space-y-2'>
        <div className='flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
            <Search size={20} />
          </div>
          <span className='font-medium'>Tất cả</span>
        </div>

        <div className='flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-100'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
            <FileText size={20} />
          </div>
          <span className='font-medium'>Bài viết</span>
        </div>

        <div className='flex cursor-pointer items-center gap-3 rounded-lg bg-blue-50 p-2 hover:bg-blue-100'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white'>
            <Users size={20} />
          </div>
          <span className='font-medium'>Mọi người</span>
        </div>
      </div>

      <div className='ml-13 mt-2 space-y-1'>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2'>
          <span className='text-sm'>Bạn của bạn bè</span>
          <div className='relative h-5 w-9 cursor-pointer rounded-full bg-gray-300'>
            <div className='absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white'></div>
          </div>
        </div>

        <div className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-blue-500 hover:bg-gray-100'>
          <span>Đà Nẵng</span>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white'>×</span>
        </div>

        <div className='flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-blue-500 hover:bg-gray-100'>
          <span className='truncate'>Trường Đại học Sư phạm - Đại học Đà Nẵng</span>
          <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white'>×</span>
        </div>

        <div className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100'>
          <span className='text-sm'>Công việc</span>
          <SlidersHorizontal size={17} className='text-gray-500' />
        </div>
      </div>
    </div>
  )
}

export default SidebarGlobalSearch
