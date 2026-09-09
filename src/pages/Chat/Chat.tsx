import { useEffect } from 'react'
import { io } from 'socket.io-client'

const Chat = () => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL)
    socket.on('connect', () => {
      console.log(socket.id)
      socket.on('start', (arg) => {
        console.log(arg)
      })
    })

    socket.on('disconnect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return <div>Chat</div>
}

export default Chat
