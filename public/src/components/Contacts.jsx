import React from 'react'
import { AllContacts} from '../context/context'
import { useContext } from 'react'
import { useState,useEffect } from 'react'
import { selectChat } from '../context/context'

const Contacts = () => {
  const contacts = useContext(AllContacts)
  const selected = useContext(selectChat)
  const [ind,setInd] = useState(-1);
  const changeChat =  (index) => {
    selected.setSelectedChat(contacts.contacts[index]);
    setInd(index);
  }

  return (
    <div className='flex flex-col justify-center items-center p-2 gap-1.5 w-full'>
       {contacts.contacts.map((item,index)=>{
            return (<div key={index} onClick={()=>changeChat(index)} className={ind!=index ? 'bg-gray-600 flex flex-row text-mono gap-1.5 p-2 w-full justify-center items-center hover: cursor-pointer rounded-full' : 'bg-green-600 flex flex-row gap-1.5 p-2 w-full justify-center items-center hover: cursor-pointer rounded-full'}>
                <img className='flex items-center justify-center text-white'src={item.avatarImage} alt="img" />
                <h1 className='font-bold p-2 text-white flex items-center justify-center'>{item.username}</h1>
            </div>
        )
        })}
    </div>

  )
}

export default Contacts
