import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./NavBar.css"
import {RiCloseLine , RiMenu3Line} from 'react-icons/ri';

const Menu = ()=>{
  return(
    <>
      <p><a href='/'>Home</a></p>
      <p><a href='/org-dashboard'>For Organistions</a></p>
      <p><a href='/ind-dashboard'>For Individuals</a></p>
    </>
  )
}
const NavBar = () => {
  const [toggle , setToggle] = useState(false);
  const handleClick = ()=>{
    // const navigate = useNavigate()
    // navigate('/');
  }
  return (
    <div className="gpt3_nav bg-black">
      <div className="gpt3_nav-links">
        <div className="logo">
          <img src="" alt="logo" height="16rem"/>
        </div>
        <div className="gpt3_nav-links-container">
          <Menu/>
        </div>
      </div>
      <div className="buttons-and-menu">
        <div className="buttons">
          <div>
            <button className="sbuttons signup" onClick={handleClick}> Sign up </button>
          </div>
        </div>
        <div className="gpt3_nav-menu">
          {toggle ?<RiCloseLine color = "#fff" size="27" onClick={()=>setToggle(false)}/> : 
            <RiMenu3Line color = "#fff" size="27" onClick={()=>setToggle(true)}/> }
          {toggle && (
            <div className="mobile-menu-container animation">
                <Menu/>
                <div className="mobile-menu-buttons">
                  <div>
                    <button className="sbuttons signup"> Sign up </button>
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar