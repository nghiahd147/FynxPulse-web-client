import SidebarGlobalSearch from './components/SidebarGlobalSearch'

const GlobalSearch = () => {
  return (
    <>
      <div className='flex h-screen'>
        <SidebarGlobalSearch />
        <div className='flex-1 bg-white'>2</div>
      </div>
    </>
  )
}

export default GlobalSearch
