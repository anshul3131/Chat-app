import React, { useEffect } from "react";
import Logo from "../assets/chatbot.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { allUsersRoute } from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import ChatBox from "../components/ChatBox";
import { AllContacts,selectChat,Messages } from "../context/context";

const Chat = () => {
 
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [contacts,setContacts] = useState();
  const [selectedchat,setSelectedChat] = useState(null);
  const [messages,setMessages] = useState([]);
  useEffect(() => {
    const func = async () => {
      
      if (!localStorage.getItem("chat-app")) navigate("/login");
      else {
        setUser(await JSON.parse(localStorage.getItem("chat-app")));
        
      }
      
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
     
      if(user){
        if (!user.isAvatarImageSet){
          navigate("/setavatar");
        }
        else{
          const {data} = await axios.get(`${allUsersRoute}/${user._id}`);
          console.log(data)
          setContacts(data);
        }
      }
    };
    func();
  }, [user]);
  useEffect(() => {
    
  }, [contacts])
  
 

  return (
    <Messages.Provider value={{messages,setMessages}}>
    <selectChat.Provider value={{selectedchat,setSelectedChat}}>
    {contacts && <AllContacts.Provider value={{contacts,setContacts}}>
    <div>
      <div className="bg-gray-800 flex justify-center items-center p-4 w-screen h-screen">
        <div className="chat_container w-3/4 h-3/4 bg-gray-900 flex flex-row">
          <div className="contacts flex  flex-col w-[25%]  h-[100%]  bg-black justify-between items-center">
            <div className="list flex flex-col justify-center items-center w-full">
              <img
                className="invert w-[120px] h-[120px]"
                src={Logo}
                alt="logo"
              />
              <Contacts/>
            </div>
            <div className="border-[4px] border-black profile flex flex-row bg-gray-900 w-full gap-2 justify-center items-center">
              <img
                className="p-3 w-1/2 text-white"
                src="xyz.com"
                alt="img"
              />
              <h1 className="admin p-3 w-1/2 text-white font-bold font-mono">{user.username}</h1>
            </div>
          </div>
          {user && <ChatBox currentUser={user}/>}
        </div>
        
        
      </div>
    </div>
    </AllContacts.Provider>}
    </selectChat.Provider>
    </Messages.Provider>
  );
};

export default Chat;
