import { Laugh, Minus, MoreHorizontal, Phone, SendHorizontal, Video, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Users } from '../../types/user.types'
import type { Socket } from 'socket.io-client'

interface FloatingChatWindowProps {
  friend: Users
  onClose: () => void
  socket: Socket
}

const FloatingChatWindow = ({ friend, onClose, socket }: FloatingChatWindowProps) => {
  const [message, setMessage] = useState('')
  const fullName = `${friend.first_name || ''} ${friend.last_name || ''}`.trim() || 'Người dùng FynxPulse'
  const avatar = friend.avatar || '/avatar-mac-dinh.jpg'
  const [dataMessage, setDataMessage] = useState<{ content: string; isSender?: boolean }[]>([])

  useEffect(() => {
    const handleReceivePrivateMessage = (data: { content: string; from: string }) => {
      if (data.from !== friend._id) return

      setDataMessage((prev) => [
        ...prev,
        {
          content: data.content,
          isSender: false
        }
      ])
    }

    socket.on('receive private message', handleReceivePrivateMessage)

    return () => {
      socket.off('receive private message', handleReceivePrivateMessage)
    }
  }, [friend._id, socket])

  const handleSendMessage = (user_id: string) => {
    const content = message.trim()
    if (!content || !socket.connected) return

    socket.emit('private message', {
      content,
      to: user_id
    })
    setDataMessage((prev) => [
      ...prev,
      {
        content,
        isSender: true
      }
    ])
    setMessage('')
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

      <div className='hide-scrollbar flex flex-1 flex-col overflow-y-auto px-3 pb-3 pt-5'>
        <div className='mb-7 flex flex-col items-center text-center'>
          <img src={avatar} alt={fullName} className='mb-2 h-16 w-16 rounded-full object-cover shadow-sm' />
          <p className='text-[15px] font-bold text-gray-900'>{fullName}</p>
          <p className='mt-0.5 text-xs text-gray-500'>Bạn bè trên FynxPulse</p>
        </div>

        {dataMessage.map((item, index) => {
          return (
            <div
              key={`${index} - ${item.content}`}
              className={`${item.isSender === true ? 'justify-end' : ''} mb-1 flex items-end gap-2`}
            >
              {item.isSender === false && (
                <img src={avatar} alt='' className='h-7 w-7 shrink-0 rounded-full object-cover' />
              )}
              <div className='max-w-56.25 rounded-2xl rounded-bl-md bg-gray-100 px-3 py-2 text-[14px] leading-4.5 text-gray-900'>
                {item.content}
              </div>
            </div>
          )
        })}

        {/* <p className='mb-3 ml-9 text-[10px] text-gray-400'>12:30</p> */}
        {/* <p className='text-right text-[10px] text-gray-400'>Đã xem</p> */}
      </div>

      <footer className='flex min-h-14 shrink-0 items-end gap-1.5 px-2 pb-2 text-[#1d9bf0]'>
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
          type='button'
          aria-label='Gửi tin nhắn'
          className='mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-blue-50 active:scale-95'
          onClick={() => handleSendMessage(friend._id as string)}
        >
          <SendHorizontal size={20} fill='currentColor' />
        </button>
      </footer>

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
