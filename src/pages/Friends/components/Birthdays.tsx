import { MessageCircle, Send, Smile } from 'lucide-react'

const Birthdays = () => {
  return (
    <div className='max-w-175 w-full mx-auto pb-10'>
      {/* Card 1 */}
      <div className='bg-white rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4 mb-4'>
        <h2 className='text-[20px] font-bold mb-4'>Sinh nhật hôm nay</h2>
        <div className='flex gap-x-3'>
          <img
            src='./avatar-mac-dinh.jpg'
            alt=''
            className='w-16 h-16 rounded-full bg-blue-600 object-cover shrink-0'
          />
          <div className='flex-1 flex flex-col'>
            <div className='flex justify-between items-center mb-1'>
              <span className='font-semibold text-[15px] text-black'>Bùi Đạt</span>
              <span className='text-[13px] text-gray-500'>23 tuổi</span>
            </div>
            <div className='flex items-center gap-x-2 mb-2'>
              <div className='flex-1 bg-gray-100 rounded-full flex items-center px-4 py-1.5'>
                <input
                  type='text'
                  defaultValue='Đạt ơi, chúc mừng sinh nhật nhé! ☀️ 🎂 🎁'
                  className='bg-transparent border-none outline-none flex-1 text-[15px] text-gray-700 truncate'
                />
                <Smile className='w-5 h-5 text-gray-400 cursor-pointer shrink-0 ml-2' />
              </div>
              <div className='w-9 h-9 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer transition-all shrink-0'>
                <Send className='w-5.5 h-5.5 text-[#1877F2]' />
              </div>
            </div>
            <div className='flex flex-wrap gap-2 mt-1'>
              <span className='px-3 py-1.5 border border-gray-300 rounded-full text-[14px] cursor-pointer hover:bg-gray-100 transition-all font-medium text-gray-700'>
                Sinh nhật vui vẻ nhé! 💐 🎉 🥳
              </span>
              <span className='px-3 py-1.5 border border-gray-300 rounded-full text-[14px] cursor-pointer hover:bg-gray-100 transition-all font-medium text-gray-700'>
                Chúc bạn đón tuổi mới thật tuyệt vời nha! ☀️ 🎁 🎈
              </span>
              <span className='px-3 py-1.5 border border-gray-300 rounded-full text-[14px] cursor-pointer hover:bg-gray-100 transition-all font-medium text-gray-700'>
                SNVV! 💐 🥂
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className='bg-white rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4 mb-4'>
        <h2 className='text-[20px] font-bold mb-4'>Sinh nhật sắp tới</h2>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-3'>
            <div className='relative'>
              <img src='./avatar-mac-dinh.jpg' alt='' className='w-16 h-16 rounded-full bg-gray-300 object-cover' />
              <div className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full'></div>
            </div>
            <div className='flex flex-col'>
              <span className='font-semibold text-[15px] text-black'>Name</span>
              <span className='text-[13px] text-gray-500 mt-0.5'>25 tháng 7, 2003 · 23 tuổi</span>
            </div>
          </div>
          <button className='cursor-pointer flex items-center gap-x-2 bg-[#E4E6E9] hover:bg-[#D8DADF] transition-all px-3 py-2 rounded-md font-semibold text-[15px] text-black'>
            <MessageCircle className='w-5 h-5' />
            Nhắn tin
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className='bg-white rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-4 mb-4'>
        <h2 className='text-[17px] font-bold mb-1'>Tháng 7</h2>
        <p className='text-[15px] mb-3 text-black'>Thuan Tang, Quang Thuan Tang và 3 người khác</p>
        <div className='flex items-center gap-x-2'>
          <img src='' alt='' className='w-13 h-13 rounded-full bg-gray-300 object-cover' />
          <img src='' alt='' className='w-13 h-13 rounded-full bg-gray-300 object-cover' />
          <img src='' alt='' className='w-13 h-13 rounded-full bg-gray-300 object-cover' />
          <img src='' alt='' className='w-13 h-13 rounded-full bg-gray-300 object-cover' />
          <img src='' alt='' className='w-13 h-13 rounded-full bg-gray-300 object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Birthdays
