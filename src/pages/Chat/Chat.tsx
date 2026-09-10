import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useUserStore from '../../store/useUserStore'

const Chat = () => {
  const { me } = useUserStore()
  const [value, setValue] = useState('')

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL)
    socket.on('connect', () => {
      socket.auth = {
        user_id: me._id
      }
    })

    socket.on('disconnect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleSubmitChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(value)
    setValue('')
  }

  return (
    <div className='h-screen'>
      <form onSubmit={handleSubmitChat}>
        <input
          type='text'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className='border border-amber-800'
        />
        <button>Gửi</button>
      </form>
    </div>
  )
}

export default Chat
