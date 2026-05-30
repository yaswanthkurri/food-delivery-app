import React, { useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import './Login_popup.css'
const Login_popup = ({setshowlogin}) => {
  const[currstate,setcurrstate]=useState("Sign Up");
  return (
    <div className='login-popup'>
    <form action="" className="login-popup-container">
      <div className="login-popup-title">
        <h2>{currstate}</h2>
        <img onClick={()=>setshowlogin(false)} src={cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currstate==="Login"?<></>: <input type="text" placeholder='Your name' required/>}
        <input type="email" placeholder='Your email' required/>
        <input type="password" placeholder='Password' required/>
      </div>
      <button>{currstate==="Sign Up"?"Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p>By continuing, i agree to the terms of use & policy.</p>
      </div>
      {currstate==="Login"?<p>Create a new account? <span onClick={()=>setcurrstate("Sign Up")}>Click here</span></p>: <p>Already have an account? <span onClick={()=>setcurrstate("Login")} >Login here</span></p>}
    </form>
    </div>
  )
}

export default Login_popup;
