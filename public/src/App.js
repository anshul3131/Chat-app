import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/setAvatar';
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Chat/>}></Route>
          <Route path="/setavatar" element={<SetAvatar/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
