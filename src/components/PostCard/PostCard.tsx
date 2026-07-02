import { Camera, Heart, Smile, Sticker } from 'lucide-react'
import type { Posts } from '../../types/post.types'
import PostOptionsMenu from './PostOptionsMenu'
import PostReactionButton from './PostReactionButton'
import PostCommentButton from './PostCommentButton'
import PostShareButton from './PostShareButton'
import PostAuthorInfo from './PostAuthorInfo'

const PostCard = ({ postByAuthor }: { postByAuthor: Posts[] }) => {
  return (
    <>
      {postByAuthor.map((item, index) => {
        return (
          <div key={index} className='bg-white rounded-2xl shadow-md border border-gray-200 p-4'>
            <div className='flex items-start justify-between'>
              <PostAuthorInfo post={item} />
              <PostOptionsMenu idPost={item._id || ''} />
            </div>

            <p className='mt-3 text-[22px] leading-tight font-normal'>{item.content}</p>

            <div className='mt-3 flex items-center justify-between text-gray-600'>
              <div className='flex items-center gap-3'>
                <PostReactionButton post_id={item._id || ""} like_count={item.like_count || 0} />
                <PostCommentButton post={item} count={item.comment_count || 0} />
                <PostShareButton />
              </div>
              <div className='flex items-center'>
                <Heart className='w-5 h-5 fill-red-500 text-red-500' />
              </div>
            </div>

            <div className='mt-3 flex items-center gap-2 bg-gray-100 rounded-full px-2 py-2'>
              <img
                src='/avatar-mac-dinh.jpg'
                alt='my-avatar'
                className='w-10 h-10 rounded-full object-cover border border-gray-200'
              />
              <input
                type='text'
                placeholder='Viết bình luận...'
                className='flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500'
              />
              <div className='flex items-center gap-3 text-gray-500'>
                <Smile className='w-5 h-5' />
                <Smile className='w-5 h-5' />
                <Camera className='w-5 h-5' />
                <Sticker className='w-5 h-5' />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PostCard
