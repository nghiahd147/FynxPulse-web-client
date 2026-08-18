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
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import usePostStore from '../../store/usePostStore'
import type { Posts } from '../../types/post.types'

const PostCard = () => {
  const { profileUser } = useUserStore()
  const { getPostsByAuthorId, postByAuthor } = usePostStore()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [data, setData] = useState<Posts[]>(postByAuthor?.data ?? [])

  const getPost = async (pageNumber: number) => {
    const res = await getPostsByAuthorId({ page: pageNumber, page_size: 5, author_id: profileUser._id as string })
    if (!res) return

    setData((prev) => (pageNumber === 1 ? res.data : [...prev, ...res.data]))
    setPage(pageNumber)
    setHasMore(pageNumber < res.total_page)
  }

  useEffect(() => {
    getPost(1)
  }, [])

  const fetchMore = () => {
    getPost(page + 1)
  }

  return (
    <>
      <InfiniteScroll
        className='hide-scrollbar'
        dataLength={data?.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className='flex w-full justify-center py-4'>
            <Spin />
          </div>
        }
        endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
      >
        {data?.map((item, index) => {
          const post = item.type === 0
          const repost = item.type === 1
          // const comment = item.type === 2
          const quote = item.type === 3
          return (
            <div key={index} className='bg-white rounded-2xl shadow-md border border-gray-200 p-4 my-2'>
              {/* Repost */}
              {repost && (
                <>
                  <div className='flex items-center mt-1 mb-2 cursor-pointer hover:underline'>
                    <Repeat2 className='ml-2 h-4 w-4 text-gray-400 mr-1' strokeWidth={2} />
                    <Link to={`/profile/${item.user_info.user_name}`} className='text-gray-400 text-sm'>
                      {item.user_info._id === profileUser._id
                        ? 'Bạn là người đăng lại'
                        : item.user_info.first_name + ' ' + item.user_info.last_name}
                    </Link>
                  </div>
                  {/* Post parent */}
                  <>
                    <div className='flex items-start justify-between'>
                      {item.parent_id && (
                        <PostAuthorInfo post={item.parent_id} userInfoParent={item.user_info_parent} />
                      )}
                    </div>
                    <p className='mt-3 text-[22px] leading-tight font-normal'>{item.parent_id?.content}</p>
                    {item.hashtags && item.hashtags.length > 0 ? (
                      <span className='text-[22px] leading-tight font-normal text-blue-500'>
                        {item.hashtags?.map((item) => item.name)}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                </>
              )}
              {/* Post */}
              {post == true && (
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
              {quote && (
                <>
                  <div className='flex items-start justify-between'>
                    <PostAuthorInfo post={item} />
                    <PostOptionsMenu idPost={item._id || ''} />
                  </div>
                  <p className='mt-3 text-[22px] leading-tight font-normal'>{item.content}</p>

                  <div className='mx-5 my-5 p-5 border border-gray-300 rounded-md'>
                    <div className='flex items-start justify-between'>
                      {item.parent_id && (
                        <PostAuthorInfo post={item.parent_id} userInfoParent={item.user_info_parent} />
                      )}
                    </div>
                    <p className='mt-3 text-[22px] leading-tight font-normal'>{item.parent_id?.content}</p>
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
                  <PostShareMenu
                    post_children={item.post_children}
                    post_children_repost={item.post_children_repost}
                    post_children_qoute={item.post_children_qoute}
                    getPost={getPost}
                    post_id={item._id as string}
                  />
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
      </InfiniteScroll>
    </>
  )
}

export default PostCard
