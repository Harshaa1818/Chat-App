import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io("http://localhost:9000")
function App() {
  const [message, setMessage] = useState("");
  const [data,setData]=useState([])

  useEffect(() => {
    socket.on("messages", (message) => {
      setData((prev)=>[...prev,message])
    })

    return ()=>{
      socket.off("user-message")
    }
  }, [])
 

  const handlesubmit = (e) => {
    e.preventDefault();
    if(message){
    socket.emit("user-message",message)
    setMessage("")
    }

  }

  return (
   <div>
    <ul>
   {data && data.map((item,index)=>
   <li key={index}>
    {item}
    </li>)}
    </ul>
    <input placeholder='type a message' onChange={(e)=>setMessage(e.target.value)}/>
    <button type='submit' onClick={handlesubmit}>send</button>

   </div>
  )
}

export default App
