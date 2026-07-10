import { Modal, Tabs, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import useReactionStore from '../../../store/useReactionStore'
import type { Posts } from '../../../types/post.types'

const PostReactionTotal = ({ post }: { post: Posts }) => {
  const getReactionByPost = useReactionStore((state) => state.getReactionByPost)
  const reactions = useReactionStore((state) => (post._id ? state.reactions[post._id] : undefined))
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (post._id) {
      getReactionByPost(post._id)
    }
  }, [getReactionByPost, post._id])

  if (!reactions || reactions.reaction_total === 0) return null

  const { like, heart, haha, sad, wow, all } = reactions.emoji_info
  const groups = [
    { key: 'all', emoji: 'Tất cả', users: all.users },
    { key: 'like', emoji: '👍', users: like.users },
    { key: 'heart', emoji: '❤️', users: heart.users },
    { key: 'haha', emoji: '😂', users: haha.users },
    { key: 'wow', emoji: '😮', users: wow.users },
    { key: 'sad', emoji: '😢', users: sad.users }
  ].filter((group) => group.users.length > 0)

  const tabItems = groups.map((group) => ({
    key: group.key,
    label: `${group.emoji} ${group.users.length}`,
    children: (
      <div className='flex flex-col gap-3'>
        {group.users.map((user) => (
          <div key={user._id} className='flex items-center gap-3'>
            <img src={user.avatar || ''} alt='avatar' className='h-10 w-10 rounded-full object-cover' />
            <span className='text-[15px] font-medium'>
              {user.first_name} {user.last_name}
            </span>
          </div>
        ))}
      </div>
    )
  }))

  return (
    <>
      <Tooltip title={`${reactions.reaction_total} người`}>
        <div className='flex cursor-pointer items-center gap-1' onClick={() => setIsOpen(true)}>
          {groups
            .filter((item) => item.emoji !== 'Tất cả')
            .map((group) => (
              <span key={group.key} className='text-base'>
                {group.emoji}
              </span>
            ))}
        </div>
      </Tooltip>

      {/* Modal */}
      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <Tabs items={tabItems} />
      </Modal>
    </>
  )
}

export default PostReactionTotal
