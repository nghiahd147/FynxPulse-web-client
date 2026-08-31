import { Globe, Lock, Users } from 'lucide-react'
import { formatDateVN } from '../../../utils/date'
import type { Posts } from '../../../types/post.types'

const PostAuthorInfo = ({
  post,
  userInfoParent
}: {
  post: Posts
  userInfoParent?: { first_name: string; last_name: string; avatar: string }
}) => {
  return (
    <div className='flex posts-center gap-3'>
      <img
        src={`${userInfoParent ? userInfoParent?.avatar : post.user_info?.avatar || ''}`}
        alt='avatar'
        className='w-10 h-10 rounded-full object-cover border border-gray-200'
      />
      <div className='flex flex-col'>
        <span className='text-[16px] font-semibold leading-none'>
          {userInfoParent
            ? userInfoParent?.first_name + ' ' + userInfoParent?.last_name
            : post.user_info?.first_name + ' ' + post.user_info?.last_name || ' '}
        </span>
        {/* <span className="text-gray-500">›</span> Quang Nghĩa */}
        <div className='flex items-center gap-1'>
          <span className='text-gray-500 text-xs mt-1 leading-none cursor-pointer hover:underline transition-all ease-in'>
            {formatDateVN(post.created_at)}
          </span>
          {post.audience == 0 ? (
            <Globe className='w-3.5 h-3.5 text-gray-500 mt-1' />
          ) : post.audience == 1 ? (
            <Users className='w-3.5 h-3.5 text-gray-500 mt-1' />
          ) : (
            <Lock className='w-3.5 h-3.5 text-gray-500 mt-1' />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostAuthorInfo
