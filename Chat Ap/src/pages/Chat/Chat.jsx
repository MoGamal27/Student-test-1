import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSide from '../../Components/LeftSide/LeftSide'
import ChatBox from '../../Components/ChatBox/ChatBox'
import RightSide from '../../Components/RightSide/RightSide'
import { AppContext } from '../../context/AppContext'



export default function Chat() {

  const {chatData,userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);


  useEffect(()=> {

    if (chatData && userData) {
      setLoading(false);
    }
  },[chatData,userData])
  return (
    <div className='chat'>
      {
        loading
        ?<p className='loading'>Loading...</p>
        : <div className="chat-container">
        <LeftSide/>
        <ChatBox/>
        <RightSide/>
      </div>
      }
    </div>
  )
}
