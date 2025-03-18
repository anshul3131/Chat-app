import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/chatbot.png";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute} from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
 
  useEffect(() => {
    if (localStorage.getItem('chat-app')) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-app',
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };
  const handleValidation = (e) => {
    const { password, confirmPassword, username, email } = values;
    if (username.length ==="") {
      toast.error("Username and Password are required", toastOptions);
      return false;
    } else if (password.length ==="") {
      toast.error(
        "Username and Password are required",
        toastOptions
      );
      return false;
    } 
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="bg-gray-800 flex justify-center items-center p-4 w-screen h-screen">
        <form
          className="bg-black flex flex-col items-center justify-center p-5 gap-1.5 w-1/2 rounded-2xl text-white"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="title flex flex-row justify-center items-center">
          <img className="invert w-[200px]" src={Logo} alt="logo" />
          <h1 className="font-bold text-[40px]">Chat App</h1>
          </div>
          
          <input
            className="m-2 rounded-2xl bg-black p-2 w-full border border-purple-600"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
      
          <input
            className="m-2 rounded-2xl bg-black p-2 w-full border border-purple-600"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          
           <button
              className="bg-black p-3 m-2 rounded-2xl w-fit font-bold border border-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-150 ease-in-out"
              type="submit"
            >
              Login User
            </button>
          <div className="common flex flex-row justify-center items-center gap-1.5">
            <span>Create an Account? </span>
            <Link to="/register" className="font-bold text-blue-600">
                Register
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
