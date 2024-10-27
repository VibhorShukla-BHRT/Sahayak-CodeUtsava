import React from 'react'
import {useState} from 'react'
import { RiAccountCircleLine,RiNotification3Line } from "react-icons/ri";
import Logout from '../Logoutbtn/Logout';
const DashNav = () => {
    const[userMenu , SetUserMenu]=useState(false);
    const toggleUserMenu=()=>{
        SetUserMenu(!userMenu);
    }
  return (
    <div className='flex w-screen justify-between px-6 py-6 border-b-slate-400 border-b-4'>
        <div className='bg-gradient-text bg-clip-text'><h1 className='font-extrabold text-2xl text-slate-600 text-transparent'>Dashboard</h1></div>
        <div className='flex w-[100px] justify-between'>
            <div>
                <RiNotification3Line color='rgb(71 85 105)' size={27}/>
            </div>
            <div >
                <RiAccountCircleLine color='rgb(71 85 105)' size={27} onClick={toggleUserMenu}/>
            </div>
            <div className={userMenu? 'flex absolute top-[55px] right-[15px]': 'hidden'}>
                <Logout/>
            </div>
        </div>
    </div>
  )
}

export default DashNav