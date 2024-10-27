import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/NavBar/NavBar'
import Login from './components/Login/Login'
import DashBoard from './components/DashBoard/DashBoard'
import LoginOrg from './components/Login/LoginOrg';
import Filepicker from './components/FilePicker/FilePicker';
// import DashBoardOrg from './components/DashBoardOrg/DashBoardOrg'
function App() {

  return (
    <>
    <BrowserRouter>
    {/* <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard-org" element={<DashBoardOrg/>} />
      <Route path="/dashboard-ind" element={<DashBoard/>} />
      <Route path="/Login" element={<Login/>} />
     </Routes> */}
     {/* <DashBoard/> */}
     {/* <Filepicker/> */}
     {/* <Navbar/> */}
     <Login/>
     {/* <LoginOrg/> */}
    </BrowserRouter>
    </>
  )
}

export default App
