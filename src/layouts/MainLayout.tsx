import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import useUserStore from '../store/useUserStore'
import MainSidebar from '../components/Sidebar/Sidebar'
import ActiveUsersSidebar from '../components/ActiveUsersSidebar/ActiveUsersSidebar'

const MainLayout = () => {
  const [isTabOpen, setTabOpen] = useState(false)
  const location = useLocation()
  const isTabNoSidebar =
    !location.pathname.startsWith('/profile') &&
    !location.pathname.startsWith('/friends') &&
    !location.pathname.startsWith('/reels')
  const { getMe } = useUserStore()

  useEffect(() => {
    getMe()
  }, [])

  return (
    <div className='flex sm:block'>
      {isTabOpen && (
        <div className='relative z-10 h-screen w-[90%] border-r-2 border-gray-100 bg-white sm:hidden'></div>
      )}

      <div className='hide-scrollbar relative h-screen w-full overflow-x-hidden overflow-y-auto bg-white'>
        {isTabOpen && (
          <div
            className='absolute left-0 right-0 top-0 bottom-0 bg-gray-950/60 z-10'
            onClick={() => setTabOpen(false)}
          ></div>
        )}
        <header className='border-b border-gray-200 bg-white'>
          <Header setTabOpen={setTabOpen} />
        </header>
        <main className={`min-h-[calc(100vh-4rem)] bg-white ${isTabNoSidebar ? 'flex w-full items-start' : ''}`}>
          {isTabNoSidebar && <MainSidebar />}
          <div className='min-w-0 flex-1 bg-bgPrimary'>
            <Outlet />
          </div>
          {isTabNoSidebar && <ActiveUsersSidebar />}
        </main>
        {/* {location.pathname.split("/")[1] !== "profile" && <Footer />} */}
      </div>
    </div>
  )
}

export default MainLayout
