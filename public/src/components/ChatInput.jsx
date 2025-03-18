import React, { useContext, useEffect } from "react";
import send_icon from "../assets/send_icon.png";
import { useState } from "react";
import emoji_icon from "../assets/emoji_icon.png";
import EmojiPicker from "emoji-picker-react";
import { selectChat } from "../context/context";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Messages } from "../context/context";

const ChatInput = () => {
  const [message, setMessage] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState(true);
  const selected = useContext(selectChat);
  const messages = useContext(Messages);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const ShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const onEmojiClick = (emoji) => {
    const updatedMessage = message+emoji.emoji
    setMessage(updatedMessage);
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchMessages = async () => {

      try {
        const user = await JSON.parse(localStorage.getItem("chat-app"));

        if (!user || !selected.selectedchat) return; // Avoid running when data is missing
       
        const {data} = await axios.post(recieveMessageRoute, {
          from: user._id,
          to: selected.selectedchat._id,
        });
    
        if (data.status === 'ok') {
            messages.setMessages(data.msgs)
        } else {
          toast.error("Cannot Fetch Messages", toastOptions);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [selected.selectedchat,newMessage]);

  const SendMessage = async () => {
    const user = await JSON.parse(localStorage.getItem("chat-app"));
    if(!message)
        return;
    try {
      const { status, msg } = await axios.post(sendMessageRoute, {
        from: user._id,
        to: selected.selectedchat._id,
        message: message,
      });
      console.log(status);
      if (status === 'ok') {
        console.log(msg);
      } else toast.error(msg, toastOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const HandleKeyDown = (e) => {
    if (e.key === "Enter") {
      SendMessage();
      setMessage("");
      setNewMessage(!newMessage);
    }
  };
  useEffect(() => {
    console.log(messages);
  }, [messages])
  
  return (
    <>
      <div className="container flex flex-row p-2 justify-center items-center gap-1.5 relative">
        <img
          src={emoji_icon}
          alt=""
          className="w-[30px] hover:cursor-pointer"
          onClick={() => ShowEmojiPicker()}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50 bg-white shadow-lg rounded-lg">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <input
          onChange={onChange}
          onKeyDown={HandleKeyDown}
          type="text"
          name="message"
          value={message}
          placeholder="Type the message"
          className="bg-gray-900 rounded-full p-2 w-full"
        />
        <img
          src={send_icon}
          onClick={SendMessage}
          alt=""
          className="w-[30px] invert hover:cursor-pointer"
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default ChatInput;
