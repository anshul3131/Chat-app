import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/chatbot.png";
import { ToastContainer, toast } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = (e) => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password doesn't Matched!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be at least 3 character", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
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
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="m-2 rounded-2xl bg-black p-2 w-full border border-purple-600"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="m-2 rounded-2xl bg-black p-2 w-full border border-purple-600"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bg-black p-3 m-2 rounded-2xl w-fit font-bold border border-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-150 ease-in-out"
            type="submit"
          >
            Create User
          </button>
          <div className="common flex flex-row justify-center items-center gap-1.5">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-blue-600">
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
