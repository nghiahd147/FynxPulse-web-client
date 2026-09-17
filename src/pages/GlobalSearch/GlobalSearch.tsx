import SearchPostList from './components/SearchPostList'
import SidebarGlobalSearch from './components/SidebarGlobalSearch'

const GlobalSearch = () => {
  return (
    <>
      <div className='flex h-screen'>
        <SidebarGlobalSearch />
        <div className='flex-1 mx-10 my-5'>
          <SearchPostList />
        </div>
      </div>
    </>
  )
}

export default GlobalSearch
