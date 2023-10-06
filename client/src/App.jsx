
import io from 'socket.io-client'
import { useState,useEffect } from 'react';

const socket = io("/")
// ver configracion de vite.config y documentacion en google para ver otra forma de uso 

function App() {
  const [message,setMessage] = useState('')

  const handleSubmit=(e)=>{
e.preventDefault();
socket.emit('message',message)
  }

  useEffect(()=>{
    socket.on('message',message=>{
      console.log(message)
    }
    )
  })

  return (
   <div>
  <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Write your message...'
    onChange={e=>setMessage(e.target.value)} />
    <button>
      Send
    </button>
  </form>
   </div>
  )
}

export default App
