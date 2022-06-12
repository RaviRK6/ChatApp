import React from "react"
import { useEffect } from 'react'
import axios from 'axios'
import socketClient from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import './App.css'
import Message from "./components/Message";


const SERVER ="http://localhost:8000"

function App() {
  useEffect(()=>{
    // axios.get("http://localhost:8000/user/hi").then((res) =>{
    //   console.log(res.data)
    // }).catch((e)=>{
    //   console.log(e)
    // })
    const socket = socketClient(SERVER)
    socket.on('connection' , ()=>{
      console.log('user connect')
    })
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path ="/" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/chat" element={ <Chat />} />
        <Route path="/message" element={ <Message />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App