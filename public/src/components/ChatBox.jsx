import React from 'react'
import {selectChat } from '../context/context'
import { useContext } from 'react'
import Robot from '../assets/robot.gif'
import Logo from '../assets/chatbot.png'
import Logout from './Logout'
import ChatInput from './ChatInput'
import MessageContainer from './MessageContainer'
const ChatBox = ({currentUser}) => {
  const selected = useContext(selectChat);
  return (
    <div className="container w-full flex flex-col items-center font-mono">
        {selected.selectedchat==undefined? (
            <>
            <img className='w-[50%]'src={Robot} alt="image" />
            <div className="greeting">
                <h1 className='text-white font-bold text-[30px]'>Welcome <span className='text-green-500 text-[20px]'>{currentUser.username}!</span></h1>
                <h1 className='text-white font-bold text-[18px]'>Please select the chat to start messaging!</h1>

            </div>
            </>
        ) : (
         <div className="chat_box flex flex-col justify-between w-full h-full text-white">
            <div className="header h-[15%] flex flex-row justify-between p-3 items-center bg-gray-7 border border-white">
            <div className='bg-gray-600 flex flex-row gap-1.5 p-2 items-center justify-center rounded-full'>
                <img className='flex items-center justify-center text-white'src={selected.selectedchat.avatarImage} alt="img" />
                <h1 className='font-bold p-2 text-white flex items-center justify-center'>{selected.selectedchat.username}</h1>
            </div>
            <Logout/>
            </div> 
            <MessageContainer/>
            <div className="input h-[10%] border border-white">
                <ChatInput/>
            </div>
         </div>
        )}
    </div>
  )
}

export default ChatBox
