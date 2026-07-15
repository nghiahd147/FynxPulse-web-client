import type { Posts } from '../../types/post.types'
import PostOptionsMenu from './components/PostOptionsMenu'
import PostReactionButton from './components/PostReactionButton'
import PostCommentButton from './components/PostCommentButton'
import PostShareButton from './components/PostShareButton'
import PostAuthorInfo from './components/PostAuthorInfo'
import PostReactionTotal from './components/PostReactionTotal'
import CommentForm from '../CommentForm/CommentForm'

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
            {item.hashtags && item.hashtags.length > 0 ? (
              <span className='text-[22px] leading-tight font-normal text-blue-500'>
                {item.hashtags?.map((item) => item.name)}
              </span>
            ) : (
              <></>
            )}

            <div className='mt-3 flex items-center justify-between text-gray-600'>
              <div className='flex items-center gap-3'>
                <PostReactionButton
                  post_id={item._id || ''}
                  like_count={item.like_count || 0}
                  has_reaction={item.has_reaction}
                />
                <PostCommentButton post={item} count={item.comment_count || 0} />
                <PostShareButton />
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
