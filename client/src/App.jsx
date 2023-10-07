
import io from 'socket.io-client'
import { useState,useEffect } from 'react';

const socket = io("/")
// ver configracion de vite.config y documentacion en google para ver otra forma de uso 

function App() {
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);

  const handleSubmit=(e)=>{
e.preventDefault();
const inputMessage = document.getElementById('inputMessage');
const newMessage = {
  body:message,
  from:'Me'
}
setMessages([...messages,newMessage]);
socket.emit('message',message);
inputMessage.value = ''; 
}

  useEffect(()=>{
    socket.on('message',reciveMessage);

   return()=>{ 
    socket.off('message',reciveMessage);
    }
  },[])

  const reciveMessage = (message) => setMessages((state) => [...state,message]);  

  return (
   <div className='h-screen flex items-center justify-center bg-slate-600' >
  <form className='space-x-3' onSubmit={handleSubmit}>
    <div className='w-fit h-fit bg-slate-800 rounded-md space-x-3 shadow-xl shadow-slate-900  p-8 justify-center'>
    <input id='inputMessage' className='p-2 outline-0 rounded-md border  shadow-md shadow-slate-900 w-96' type='text' placeholder='Write your message...'
    onChange={e=>setMessage(e.target.value)} />
    <button className='px-3 py-2 border border-1 rounded-md font-semibold text-white shadow-slate-900 border-blue-700 shadow-md bg-blue-700 hover:bg-blue-600'>
      Send
    </button>
    <ul className='mt-6'>
      {messages.map((m,i)=>(
      <li key={i} className=' justify-center font-semibold text-white box-border  break-words max-w-sm'>
        {m.from}: {m.body}
        </li>
      ))}
    </ul>
    </div>
 
  </form>
   </div>
  )
}

export default App
