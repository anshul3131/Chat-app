import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/chatbot.png";
import { ToastContainer, toast } from "react-toastify";
import { getAvatarRoute, registerRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from 'buffer'
const SetAvatar = () => {
  const navigate = useNavigate();
  const apiUrl = "https://api.multiavatar.com/4645646";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem('chat-app'))
      navigate("/login");
  }, []);
  useEffect(() => {
    const fetchAvatars = async () => {
      try{
      const data = [];
      for (let i = 0; i < 4; i++) {
        const api = `${apiUrl}/${Math.floor((Math.random() * 1000))}`;
        data.push(api);
      }
      setAvatars(data);
      setIsLoading(false);
    }
    catch(err){
        console.log(`Error Fetching Avatar : ${err}`);
    }
    };

    fetchAvatars();
  }, []);

  const SubmitHandler = async () => {
    if (selected === null) {
      toast.error("Not selected any avatar!", toastOptions);
    }
    else{
        const user = await JSON.parse(localStorage.getItem('chat-app'))
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
            image : avatars[selected]
        });
        console.log(data)
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image
            localStorage.setItem('chat-app',JSON.stringify(user))
            navigate("/")
           
        }
        else{
            toast.error("Error setting the avatar! Try again!",toastOptions)
        }
    }
  };

  return (
    <>
      <div className="bg-gray-800 flex justify-center items-center p-4 gap-10 w-screen h-screen flex-col text-white">
        <div className="header font-bold text-[70px] bg-purple-600 rounded-2xl p-4">
          Select you Avatar
        </div>
        <div className="items flex flex-row m-2 p-2">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index} className={
                  selected === index ? `border-purple-600 border-[4px]` : ``
                }
              >
                <img
                  className="rounded-full m-3"
                  src={avatar}
                  alt="image"
                  onClick={() => setSelected(index)}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={(e) => SubmitHandler(e)}
          className="bg-black text-white text-[40px] p-3 m-2 rounded-2xl w-fit font-bold border border-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
