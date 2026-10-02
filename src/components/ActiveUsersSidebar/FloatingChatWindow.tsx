import { Laugh, Minus, MoreHorizontal, Phone, SendHorizontal, Video, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Users } from '../../types/user.types'
import type { Socket } from 'socket.io-client'
import useUserStore from '../../store/useUserStore'
import useConversationStore from '../../store/useConversationStore'
import type { Conversations } from '../../types/conversation.types'
import { PAGE, PAGE_SIZE } from '../../constants/enum'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spin } from 'antd'

interface FloatingChatWindowProps {
  friend: Users
  onClose: () => void
  socket: Socket
}

const FloatingChatWindow = ({ friend, onClose, socket }: FloatingChatWindowProps) => {
  const [message, setMessage] = useState('')
  const fullName = `${friend.first_name || ''} ${friend.last_name || ''}`.trim() || 'Người dùng FynxPulse'
  const avatar = friend.avatar || '/avatar-mac-dinh.jpg'
  const { conversationMessages, getConversations } = useConversationStore()
  const [conversations, setConversations] = useState<Conversations[]>(conversationMessages)
  const { me } = useUserStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  useEffect(() => {
    const handleReceivePrivateMessage = (data: {
      content: string
      sender_id: string
      receiver_id: string
      _id: string
    }) => {
      if (data.sender_id !== friend._id) return
      setConversations((prevConversation) => [...prevConversation, { ...data }])
    }

    socket.on('receiver_message', handleReceivePrivateMessage)

    return () => {
      socket.off('receiver_message', handleReceivePrivateMessage)
    }
  }, [friend._id, socket])

  useEffect(() => {
    const loadInitialMessage = async () => {
      if (friend._id) {
        const result = await getConversations({ page: PAGE, page_size: PAGE_SIZE, receiver_id: friend._id })
        console.log(result)
        setConversations(result.conversations)
        setPagination({ page: Number(result?.page), total_page: Number(result?.total_page) })
      }
    }
    loadInitialMessage()
  }, [friend._id, getConversations])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations])

  const handleSendMessage = (user_id: string) => {
    const content = message.trim()
    if (!content || !socket.connected || !me._id) return
    const conversation = {
      content: String(content),
      receiver_id: user_id,
      sender_id: me._id
    }
    socket.emit('send_message', conversation)
    setConversations((prevConversations) => [
      ...prevConversations,
      { ...conversation, _id: new Date().getTime().toString() }
    ])
    setMessage('')
  }

  const loadOlderMessages = async () => {
    if (friend._id && pagination.page < pagination.total_page) {
      const result = await getConversations({
        page: pagination.page + 1,
        page_size: PAGE_SIZE,
        receiver_id: friend._id
      })
      setConversations((prevConversations) => [...prevConversations, ...result.conversations])
      setPagination({ page: Number(result?.page), total_page: Number(result?.total_page) })
    }
  }

  return (
    <section
      aria-label={`Cuộc trò chuyện với ${fullName}`}
      className='fixed bottom-0 right-84 z-40 hidden h-113.75 w-82 animate-modal-in flex-col overflow-hidden rounded-t-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.22)] xl:flex'
    >
      <header className='flex h-14 shrink-0 items-center border-b border-gray-200 px-2 shadow-sm'>
        <button
          type='button'
          className='flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-gray-100'
        >
          <span className='relative shrink-0'>
            <img src={avatar} alt='' className='h-8 w-8 rounded-full object-cover' />
            <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500' />
          </span>
          <span className='min-w-0'>
            <span className='block truncate text-[14px] font-bold text-gray-900'>{fullName}</span>
            <span className='block text-[11px] text-gray-500'>Đang hoạt động</span>
          </span>
        </button>

        <div className='ml-1 flex shrink-0 items-center text-[#1d9bf0]'>
          <button type='button' aria-label='Bắt đầu cuộc gọi thoại' className='rounded-full p-2 hover:bg-blue-50'>
            <Phone size={17} fill='currentColor' />
          </button>
          <button type='button' aria-label='Bắt đầu cuộc gọi video' className='rounded-full p-2 hover:bg-blue-50'>
            <Video size={19} fill='currentColor' />
          </button>
          <button type='button' aria-label='Thu nhỏ' className='rounded-full p-2 hover:bg-blue-50'>
            <Minus size={20} strokeWidth={2.5} />
          </button>
          <button
            type='button'
            aria-label='Đóng đoạn chat'
            onClick={onClose}
            className='rounded-full p-2 hover:bg-blue-50'
          >
            <X size={19} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className='hide-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-3 pt-5'>
        <div className='mb-7 flex flex-col items-center text-center'>
          <img src={avatar} alt={fullName} className='mb-2 h-16 w-16 rounded-full object-cover shadow-sm' />
          <p className='text-[15px] font-bold text-gray-900'>{fullName}</p>
          <p className='mt-0.5 text-xs text-gray-500'>Bạn bè trên FynxPulse</p>
        </div>

        {/* Chat */}

        <div
          id='chatBox'
          style={{
            height: 500,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse'
          }}
        >
          <InfiniteScroll
            dataLength={conversations.length}
            next={loadOlderMessages}
            hasMore={pagination.page < pagination.total_page}
            loader={<Spin />}
            inverse={true}
            scrollableTarget='chatBox'
            style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'visible' }}
          >
            {conversations.map((msg, index) => {
              const isMine = msg.sender_id === me._id
              return (
                <div
                  key={`${msg._id}-${index}-${msg.content}` || `${msg.sender_id}-${index}-${msg.content}`}
                  className={`mb-1 flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMine && <img src={avatar} alt='' className='h-7 w-7 shrink-0 rounded-full object-cover' />}
                  <div
                    className={`max-w-56.25 wrap-break-word rounded-2xl px-3 py-2 text-sm ${
                      isMine ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              )
            })}
          </InfiniteScroll>
        </div>

        {/* {conversations.map((item, index) => {
          const isMine = item.sender_id === me._id

          return (
            <div
              key={item._id?.toString() || `${item.sender_id}-${index}-${item.content}`}
              className={`mb-1 flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              {!isMine && <img src={avatar} alt='' className='h-7 w-7 shrink-0 rounded-full object-cover' />}
              <div
                className={`max-w-56.25 wrap-break-word rounded-2xl px-3 py-2 text-sm ${
                  isMine ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {item.content}
              </div>
            </div>
          )
        })} */}

        <div ref={messagesEndRef} aria-hidden='true' className='h-px shrink-0' />

        {/* <p className='mb-3 ml-9 text-[10px] text-gray-400'>12:30</p> */}
        {/* <p className='text-right text-[10px] text-gray-400'>Đã xem</p> */}
      </div>

      <form
        className='flex min-h-14 shrink-0 items-end gap-1.5 px-2 pb-2 text-[#1d9bf0]'
        onSubmit={(event) => {
          event.preventDefault()
          handleSendMessage(friend._id as string)
        }}
      >
        <div className='flex min-h-10 min-w-0 flex-1 items-center rounded-full bg-gray-100 px-3 focus-within:ring-2 focus-within:ring-blue-100'>
          <input
            type='text'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder='Aa'
            aria-label='Nhập tin nhắn'
            className='min-w-0 flex-1 bg-transparent text-[14px] text-gray-900 outline-none placeholder:text-gray-500'
          />
          <button
            type='button'
            aria-label='Chọn biểu tượng cảm xúc'
            className='-mr-1 rounded-full p-1 hover:bg-gray-200'
          >
            <Laugh size={19} />
          </button>
        </div>
        <button
          type='submit'
          aria-label='Gửi tin nhắn'
          className='mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-blue-50 active:scale-95'
        >
          <SendHorizontal size={20} fill='currentColor' />
        </button>
      </form>

      <button
        type='button'
        aria-label='Tùy chọn cuộc trò chuyện'
        className='absolute right-2 top-16 hidden rounded-full bg-white p-1 text-gray-500 shadow'
      >
        <MoreHorizontal size={18} />
      </button>
    </section>
  )
}

export default FloatingChatWindow
