import React from 'react'
import Power from '../assets/power-off.png'
import { logoutRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios  from 'axios';
const Logout = () => {  
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
 
  const LogoutHandler = async () => {
    const user = await JSON.parse(localStorage.getItem('chat-app'));
    console.log(user)
    const id = user._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if(data.status===200){
        localStorage.clear();
        navigate('/login');
    }
    else{
        toast.error(data.msg,toastOptions);
    }
  }
  return (
    <div className='justify-end flex'>
    <img onClick={()=>LogoutHandler()}src={Power} className="invert w-[8%] h-[70%] border border-black p-2 hover:cursor-pointer" alt="power-btn" />
    <ToastContainer/>
    </div>
  )
}

export default Logout
