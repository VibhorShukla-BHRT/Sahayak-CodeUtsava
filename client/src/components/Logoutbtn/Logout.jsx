import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
const Logout = () => {
    const {logout} = useAuth();
    const handleLogout = ()=>{
        logout();
        // navigate("/")
    }
  return (
    <div className='w-[150px] h-[100px] bg-slate-200 flex justify-center items-center rounded-lg'><button onClick={handleLogout} className='bg-blue-600 rounded-md py-1 px-3 h-[40px] text-white'>Log Out</button></div>
  )
}

export default Logout