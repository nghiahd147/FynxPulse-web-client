import { useEffect, useState } from 'react'
import { Cake, ChevronRight, Settings, UserCheck, UserRoundPlus, Users, Bell } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useUserStore from '../../store/useUserStore'
import FriendSidebar from '../../components/FriendsSidebar/FriendSidebar'
import SuggestionSidebar from '../../components/SuggestionSidebar/SuggestionSidebar'

const Friends = () => {
  const { getFollowSuggestions, me } = useUserStore()
  const location = useLocation()
  const [showSettings, setShowSettings] = useState(false)
  const [showDot, setShowDot] = useState(true)

  useEffect(() => {
    getFollowSuggestions(me._id as string)
  }, [location.pathname == '/friends'])

  return (
    <div className='h-full flex'>
      {/* Left */}
      <div className='w-[30%] px-2 py-1 shadow-[4px_0_8px_rgba(0,0,0,0.1)] relative'>
        {location.pathname.startsWith('/friends/list') ? (
          <FriendSidebar />
        ) : location.pathname.startsWith('/friends/suggestions') ? (
          <SuggestionSidebar />
        ) : (
          <>
            <div className='flex items-center justify-between mb-4 px-2 relative'>
              <h2 className='text-2xl font-bold'>Người theo dõi</h2>
              <div>
                <div
                  onClick={() => setShowSettings(!showSettings)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-colors ${showSettings ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
                >
                  <Settings className='w-5 h-5' />
                </div>

                {/* Popup Noti */}
                <div
                  className={`absolute top-12 left-0 w-86 bg-white rounded-xl shadow-[0_12px_28px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] p-4 z-999 transition-all duration-300 origin-[85%_0px] ${
                    showSettings
                      ? 'opacity-100 scale-100 visible translate-y-0'
                      : 'opacity-0 scale-50 invisible -translate-y-2'
                  }`}
                >
                  <h3 className='text-xl font-bold mb-1'>Cài đặt thông báo</h3>
                  <p className='text-[15px] text-gray-500 mb-4 leading-5'>
                    Bạn có thể quản lý cách nhận thông báo về thông tin mới của Bạn bè.
                  </p>
                  <div className='h-px bg-gray-300 w-full mb-3'></div>
                  <div
                    className='flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors'
                    onClick={() => setShowDot(!showDot)}
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                        <Bell className='w-6 h-6 text-black stroke-[1.5]' />
                      </div>
                      <span className='font-semibold text-[15px]'>Hiển thị dấu chấm thông báo</span>
                    </div>
                    <div
                      className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${showDot ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${showDot ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to={'/friends'}
              className={`w-full font-semibold flex items-center justify-between cursor-pointer p-2 rounded-md transition-all ease-in ${
                location.pathname === '/friends' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <div className='flex items-center'>
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    location.pathname === '/friends' ? 'bg-[#1877F2] text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  <Users className='w-5 h-5' fill={location.pathname === '/friends' ? 'currentColor' : 'none'} />
                </div>
                <span className='ml-3 text-[15px]'>Trang chủ</span>
              </div>
            </Link>
            <Link
              to={'/friends/list'}
              className='w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all ease-in'
            >
              <div className='flex items-center'>
                <div className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-black'>
                  <UserCheck className='w-5 h-5' />
                </div>
                <span className='ml-3 text-[15px]'>Tất cả người theo dõi</span>
              </div>
              <ChevronRight className='w-5 h-5 text-gray-400' />
            </Link>
            <Link
              to={'/friends/suggestions'}
              className='w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all ease-in'
            >
              <div className='flex items-center'>
                <div className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-black'>
                  <UserRoundPlus className='w-5 h-5' />
                </div>
                <span className='ml-3 text-[15px]'>Gợi ý</span>
              </div>
              <ChevronRight className='w-5 h-5 text-gray-400' />
            </Link>
            <Link
              to={'/friends/birthdays'}
              className={`w-full font-semibold mt-1 flex items-center justify-between cursor-pointer p-2 rounded-md transition-all ease-in ${
                location.pathname === '/friends/birthdays' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <div className='flex items-center'>
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    location.pathname === '/friends/birthdays' ? 'bg-[#1877F2] text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  <Cake
                    className='w-5 h-5'
                    fill={location.pathname === '/friends/birthdays' ? 'currentColor' : 'none'}
                  />
                </div>
                <span className='ml-3 text-[15px]'>Sinh nhật</span>
              </div>
            </Link>
          </>
        )}
      </div>
      {/* Right */}
      <div className='w-full overflow-y-auto hide-scrollbar bg-[#F0F2F5]'>
        <Outlet />
      </div>
    </div>
  )
}

export default Friends
