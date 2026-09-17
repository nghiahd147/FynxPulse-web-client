import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import useUserStore from '../../store/useUserStore'

const Chat = () => {
  const { me } = useUserStore()
  const [value, setValue] = useState('')
  const [data, setData] = useState<{ content: string }[]>([])

  const socket = io(import.meta.env.VITE_API_URL)
  useEffect(() => {
    socket.auth = {
      user_id: me._id
    }
    socket.connect()

    socket.on('receive private message', (data) => {
      setData((prev) => [...prev, data])
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
    socket.emit('private message', {
      content: value,
      to: '6a0adc053888a626293d2d8b'
    })
    setValue('')
  }

  return (
    <div className='h-screen'>
      {data.map((item, index) => {
        return (
          <>
            <p key={index}>{item.content}</p>
          </>
        )
      })}
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
