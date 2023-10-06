
import io from 'socket.io-client'
import { useState,useEffect } from 'react';

const socket = io("/")
// ver configracion de vite.config y documentacion en google para ver otra forma de uso 

function App() {
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);

  const handleSubmit=(e)=>{
e.preventDefault();
const newMessage = {
body:message,
from:'Me'
}
setMessages([...messages,newMessage]);
socket.emit('message',message);
  }

  useEffect(()=>{
    socket.on('message',reciveMessage);

   return()=>{ 
    socket.off('message',reciveMessage);
    }
  },[])

  const reciveMessage = (message) => setMessages((state) => [...state,message]);  

  return (
   <div className='h-screen flex items-center justify-center bg-zinc-800' >
  <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Write your message...'
    onChange={e=>setMessage(e.target.value)} />
    <button>
      Send
    </button>
    <ul>
      {messages.map((m,i)=>(
      <li key={i}>
        {m.from}:{m.body}
        </li>
      ))}
    </ul>
  </form>
   </div>
  )
}

export default App
