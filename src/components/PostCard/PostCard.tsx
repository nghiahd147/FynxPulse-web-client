import type { Posts } from '../../types/post.types'
import PostOptionsMenu from './components/PostOptionsMenu'
import PostReactionButton from './components/PostReactionButton'
import PostCommentButton from './components/PostCommentButton'
import PostShareMenu from './components/PostShareMenu'
import PostAuthorInfo from './components/PostAuthorInfo'
import PostReactionTotal from './components/PostReactionTotal'
import CommentForm from '../CommentForm/CommentForm'
import PostViewButton from './components/PostViewButton'
import { Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useUserStore from '../../store/useUserStore'

const PostCard = ({ postByAuthor }: { postByAuthor: Posts[] }) => {
  const { profileUser } = useUserStore()
  return (
    <>
      {postByAuthor.map((item, index) => {
        console.log('item', item)
        const post = item.type === 0
        const repost = item.type === 1
        const comment = item.type === 2
        const quote = item.type === 3
        return (
          <div key={index} className='bg-white rounded-2xl shadow-md border border-gray-200 p-4'>
            {/* Repost */}
            {repost && (
              <div className='flex items-center mt-1 mb-2 cursor-pointer hover:underline'>
                <Repeat2 className='h-5 w-5 text-gray-400 mr-1' strokeWidth={2} />
                <Link to={`/profile/${item.user_info.user_name}`} className='text-gray-400'>
                  {item.user_info._id === profileUser._id
                    ? 'Bạn là người đăng lại'
                    : item.user_info.first_name + ' ' + item.user_info.last_name}
                </Link>
              </div>
            )}
            {/* Post */}
            {(post == true || repost == true || comment == true) && (
              <>
                <div className='flex items-start justify-between'>
                  <PostAuthorInfo post={item} />
                  <PostOptionsMenu idPost={item._id || ''} />
                </div>

                <p className='mt-3 text-[22px] leading-tight font-normal'>{item.content}</p>
                {item.hashtags && item.hashtags.length > 0 ? (
                  <span className='text-[22px] leading-tight font-normal text-blue-500'>
                    {item.hashtags?.map((item) => item.name)}
                  </span>
                ) : (
                  <></>
                )}
              </>
            )}
            {/* Quote post */}
            {/* Post */}
            {quote && (
              <>
                <div className='flex items-start justify-between'>
                  <PostAuthorInfo post={item} />
                  <PostOptionsMenu idPost={item._id || ''} />
                </div>
                <p className='mt-3 text-[22px] leading-tight font-normal'>{item.content}</p>

                <div className='mx-5 my-5 p-5 border border-gray-300 rounded-md'>
                  <div className='flex items-start justify-between'>
                    <PostAuthorInfo post={item} />
                  </div>
                  <p className='mt-3 text-[22px] leading-tight font-normal'>{item.content}</p>
                  {item.hashtags && item.hashtags.length > 0 ? (
                    <span className='text-[22px] leading-tight font-normal text-blue-500'>
                      {item.hashtags?.map((item) => item.name)}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
            <div className='mt-3 flex items-center justify-between text-gray-600'>
              <div className='flex items-center gap-3'>
                <PostReactionButton
                  post_id={item._id || ''}
                  like_count={item.reaction_count || 0}
                  has_reaction={item.has_reaction}
                />
                <PostCommentButton post={item} count={item.comment_count || 0} />
                <PostShareMenu isRepost={repost} isQuote={quote} />
                <PostViewButton count={item.views} />
              </div>
              <div className='flex items-center'>
                <PostReactionTotal post={item} />
              </div>
            </div>
            <CommentForm post={item} isModal={false} />
          </div>
        )
      })}
    </>
  )
}

export default PostCard
