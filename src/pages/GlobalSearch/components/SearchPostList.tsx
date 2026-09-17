import CommentForm from '../../../components/CommentForm/CommentForm'

import { Repeat2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useUserStore from '../../../store/useUserStore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import type { Posts } from '../../../types/post.types'
import PostAuthorInfo from '../../../components/PostCard/components/PostAuthorInfo'
import PostOptionsMenu from '../../../components/PostCard/components/PostOptionsMenu'
import PostReactionButton from '../../../components/PostCard/components/PostReactionButton'
import PostCommentButton from '../../../components/PostCard/components/PostCommentButton'
import PostShareMenu from '../../../components/PostCard/components/PostShareMenu'
import PostViewButton from '../../../components/PostCard/components/PostViewButton'
import PostReactionTotal from '../../../components/PostCard/components/PostReactionTotal'
import type { GlobalSearchType } from '../../../types/search.types'
import useSearchStore from '../../../store/useSearchStore'
import PostContent from '../../../components/PostCard/components/PostContent'

const SearchPostList = () => {
  const { profileUser } = useUserStore()
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const { textSearchGlobal, globalSearch, postGlobalSearch } = useSearchStore()
  const [data, setData] = useState<Posts[]>(postGlobalSearch?.data ?? [])

  const getPost = async (pageNumber: number) => {
    const query: GlobalSearchType = {
      page: pageNumber,
      page_size: 5,
      content: textSearchGlobal
    }

    const res = await globalSearch(query)

    if (!res) return
    setData((prev) => (pageNumber === 1 ? res.data : [...prev, ...res.data]))
    setPage(pageNumber)
    setHasMore(pageNumber < res.total_page)
  }

  useEffect(() => {
    const loadPosts = async () => {
      await getPost(1)
    }

    loadPosts()
  }, [textSearchGlobal, globalSearch])

  const fetchMore = async () => {
    await getPost(page + 1)
  }

  useEffect(() => {
    if (postGlobalSearch) {
      setData(postGlobalSearch.data)
      setPage(1)
      setHasMore(postGlobalSearch.total_page > 1)
    }
  }, [postGlobalSearch])

  return (
    <>
      <InfiniteScroll
        className='hide-scrollbar'
        dataLength={data.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className='flex w-full justify-center py-4'>
            <Spin />
          </div>
        }
        endMessage={
          data.length > 0 ? <p className='py-4 text-center text-sm text-gray-500'>Đã tải hết bài viết.</p> : null
        }
      >
        {data.map((item) => {
          const post = item.type === 0
          const repost = item.type === 1
          // const comment = item.type === 2
          const quote = item.type === 3
          return (
            <div key={item._id} className='bg-white rounded-2xl shadow-md border border-gray-200 p-4 my-2'>
              {/* Repost */}
              {repost && (
                <>
                  <div className='flex items-center mt-1 mb-2 cursor-pointer hover:underline'>
                    <Repeat2 className='ml-2 h-4 w-4 text-gray-400 mr-1' strokeWidth={2} />
                    <Link to={`/profile/${item.user_info?.user_name || ''}`} className='text-gray-400 text-sm'>
                      {item.user_info?._id === profileUser._id
                        ? 'Bạn là người đăng lại'
                        : `${item.user_info?.first_name || ''} ${item.user_info?.last_name || ''}`.trim()}
                    </Link>
                  </div>
                  {/* Post parent */}
                  <>
                    <div className='flex items-start justify-between'>
                      {item.parent_id && (
                        <PostAuthorInfo post={item.parent_id} userInfoParent={item.user_info_parent} />
                      )}
                    </div>
                    <PostContent content={item.parent_id?.content} />
                    {item.parent_id?.hashtags && item.parent_id.hashtags.length > 0 ? (
                      <span className='text-[22px] leading-tight font-normal text-blue-500'>
                        {item.parent_id.hashtags.map((hashtag) => `#${hashtag.name}`).join(' ')}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                </>
              )}
              {/* Post */}
              {post && (
                <>
                  <div className='flex items-start justify-between'>
                    <PostAuthorInfo post={item} />
                    <PostOptionsMenu idPost={item._id || ''} />
                  </div>

                  <PostContent content={item.content} />
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
                  <PostContent content={item.content} />

                  <div className='mx-5 my-5 p-5 border border-gray-300 rounded-md'>
                    <div className='flex items-start justify-between'>
                      {item.parent_id && (
                        <PostAuthorInfo post={item.parent_id} userInfoParent={item.user_info_parent} />
                      )}
                    </div>
                    <PostContent content={item.parent_id?.content} />
                    {item.parent_id?.hashtags && item.parent_id.hashtags.length > 0 ? (
                      <span className='text-[22px] leading-tight font-normal text-blue-500'>
                        {item.parent_id.hashtags.map((hashtag) => `#${hashtag.name}`).join(' ')}
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

export default SearchPostList
