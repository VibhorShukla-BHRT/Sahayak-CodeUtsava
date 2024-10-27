import React, { useState } from 'react';
import './Login.css'
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
    const [isSignUp, setIsSignUp] = useState(true);

    const {storeTokenInLS} = useAuth();
    // const navigate = useNavigate();

    const toggleMode = () => {
      setIsSignUp(!isSignUp);
    };

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phonenumber:""
    });

    const [user2, setUser2] = useState({
      email: "",
      password: "",
    });

    const handleInput= (e)=>{
      let name = e.target.name;
      let value = e.target.value;
      setUser({
       ...user,
       [name]: value,
      })
    }

    const handleInput2= (e)=>{
      let name = e.target.name;
      let value = e.target.value;
      setUser2({
       ...user2,
       [name]: value,
      })
    }

      const handleSignIn = async(e)=>{
        e.preventDefault();

        try {
            const response = await fetch("/api/v1/user/signin",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user2)
        })

        console.log(response);

        if(response.ok){

            const res = await response.json();

            storeTokenInLS(res.data.token);

            setUser({  email: "", password: "" })

            toast.success(res.message);
            // navigate("/");
        }
        else{
            const errorResponse = await response.json();
            toast.error(errorResponse.message);
        }

        } catch (error) {
          console.log(error);
        }
    }

    const handleRegister = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch("/api/v1/user/signin", {

              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(user)
          });

          if (response.ok) {

              const res = await response.json();

              setUser({ name: "", email: "", password: "",phonenumber:"" })
              storeTokenInLS(res.data.token);

              toast.success(res.message);

              // navigate("/");
          }
          else{
              const erroMessage = await response.json();
              toast.error(erroMessage.message);
          }

      } catch (error) {
          console.log(error);
      }
    };
  

  return (
    <div className='body relative bottom-[10vh] flex justify-center' >
      {/* <div className='px-2  ' >

      </div> */}
      <div className='flex h-[100vh] w-[90%] sm:w-[55%] items-center justify-center pt-24'>
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
          <div className="form-container sign-up-container">
            {isSignUp && (
              <form className="sign" onSubmit={handleRegister}>
                <h1 className="font-bold mb-2">Create Account</h1>

                <span className="text-[12px]">or use your email for registration</span>
                <input className="signInput" type="text" placeholder="Name"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                />


                <input className="signInput" type="text" placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  autoComplete='off' />
                <input className="signInput" type="tel" placeholder="Mob. No."
                  name="phonenumber"
                  value={user.phonenumber}
                  onChange={handleInput}
                />
                <input className="signInput" type="text" placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  autoComplete='off'
                />
                <button className='px-7 py-2 bg-blue-500 rounded-[25px] text-white'>Sign Up</button>
              </form>


            )}
          </div>
          <div className="form-container sign-in-container">
            {!isSignUp && (
              <form className="sign" onSubmit={handleSignIn}>
                <h1 className="font-bold m-0">Sign in</h1>

                <span className="text-[12px]">or use your account</span>
                < input className="signInput" type="email" placeholder="Email"
                  name="email"
                  value={user2.email}
                  onChange={handleInput2}
                />
                <input className="signInput" type="password" placeholder="Password"
                  name="password"
                  value={user2.password}
                  onChange={handleInput2}
                />
                <button className='px-7 py-2 bg-blue-500 rounded-[25px] text-white mt-4'>Sign In</button>
              </form>
            )}
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className={`overlay-panel overlay-left ${isSignUp ? 'right-panel-active' : ''}`}>
                <h1 className="font-bold  p-2">Welcome Back!</h1>
                <p className="text-[14px] pb-2">To keep connected with us, please login with your personal info</p>
                <button className="ghost p-4" id="signIn" onClick={toggleMode}>
                  Sign In
                </button>
              </div>
              <div className={`overlay-panel overlay-right ${isSignUp ? '' : 'right-panel-active'}`}>
                <h1 className="font-bold  p-2">Hello, Friend!</h1>
                <p className="text-[14px] pb-2">Enter your personal details and start your journey with us</p>
                <button className="ghost p-4" id="signUp" onClick={toggleMode}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;