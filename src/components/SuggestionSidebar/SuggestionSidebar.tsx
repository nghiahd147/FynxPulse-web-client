import { Link } from 'react-router-dom'
import { ArrowLeft, UserPlus } from 'lucide-react'
import useUserStore from '../../store/useUserStore'
import { Button, message } from 'antd'
import { useState } from 'react'
import { notificationError, notificationSuccess } from '../../config/notify'

const SuggestionSidebar = () => {
  const {
    listFriends,
    followUser,
    getFollowSuggestions,
    me,
    profileUser,
    checkUserFollowStatus,
    loading: { followUser: loadingFollowUser }
  } = useUserStore()
  const [loadingFollowUserId, setLoadingFollowUserId] = useState<string | null>(null)

  const handleFollowUser = async (id: string) => {
    setLoadingFollowUserId(id)
    const result = await followUser({ follower_user_id: id })
    if (result.success) {
      getFollowSuggestions(me._id as string)
      checkUserFollowStatus(profileUser._id as string)
      notificationSuccess(result.message as string)
    } else {
      notificationError(result.message as string)
    }
    setLoadingFollowUserId(null)
  }

  return (
    <>
      <div className='flex items-center gap-x-2.5 mt-2 px-1'>
        <Link
          to={'/friends'}
          className='flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 transition-all shrink-0'
        >
          <ArrowLeft className='w-5 h-5 text-[#65676B]' strokeWidth={2.5} />
        </Link>
        <div className='flex flex-col'>
          <span className='text-[#65676B] text-[13px] leading-4'>Bạn bè</span>
          <span className='text-[#050505] text-[24px] font-bold leading-7'>Gợi ý</span>
        </div>
      </div>

      <div className='px-1 mt-4'>
        {listFriends.length > 0 && <h3 className='font-bold text-[17px] mb-2'>Những người bạn có thể biết</h3>}

        <div className='flex flex-col gap-y-1'>
          {listFriends &&
            listFriends.map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all'
              >
                <img className='w-15 h-15 rounded-full object-cover bg-gray-300 shrink-0' src='' alt='' />
                <div className='flex flex-col flex-1'>
                  <Link
                    to={`/friends/suggestions/${item.user_name}`}
                    className='font-semibold text-[15px] text-black hover:text-blue-400 hover:underline transition-all ease-in'
                  >
                    {item.first_name + ' ' + item.last_name}
                  </Link>
                  <div className='flex items-center gap-x-1 mt-0.5'>
                    <div className='flex items-center -space-x-1'>
                      <img
                        className='w-4.5 h-4.5 rounded-full border-2 border-white bg-gray-300 relative z-10'
                        src=''
                        alt=''
                      />
                      <img
                        className='w-4.5 h-4.5 rounded-full border-2 border-white bg-gray-400 relative z-0'
                        src=''
                        alt=''
                      />
                    </div>
                    <span className='text-[13px] text-gray-500'>{item.mutual_friends_count} bạn chung</span>
                  </div>
                  <div className='flex items-center gap-x-2 mt-3 w-full'>
                    <Button
                      icon={<UserPlus className='w-4 h-4' />}
                      loading={loadingFollowUser && loadingFollowUserId === item._id}
                      onClick={() => handleFollowUser(item._id as string)}
                      type='primary'
                    >
                      Theo dõi
                    </Button>
                    <Button onClick={() => message.info('Đang phát triển tính năng...')} type='default'>
                      Gỡ
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default SuggestionSidebar
