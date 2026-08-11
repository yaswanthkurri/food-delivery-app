import React, { useContext, useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import './Login_popup.css'
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';
const Login_popup = ({setshowlogin}) => {
  const[currstate,setcurrstate]=useState("Login");
   const {url,token,settoken}=useContext(StoreContext);
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
 
  const onchangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({... data,[name]:value}));
  }
  const onLogin= async(event)=>{
event.preventDefault();//it avoids page reloading
let newUrl=url;
if(currstate==="Login"){
  newUrl+="/api/user/login";
}
else{
  newUrl+="/api/user/register";
}
const response=await axios.post(newUrl,data);
if(response.data.success){
  settoken(response.data.token);//saving token to stay login
localStorage.setItem("token",response.data.token);//saves the token under the key "token".
// localStorage is a built‑in browser storage.
// It lets you save small pieces of data (key–value pairs) directly in the user’s browser.
// Unlike variables or React state, the data stays even after the page reloads or the browser is closed and reopened.
// When the user refreshes the page, React state/context resets. Without localStorage, they’d be logged out immediately.
// By saving the token in localStorage, you can reload it when your app starts and keep the user logged in.
// You can also attach it to future API requests to prove the user is authenticated.
setshowlogin(false);
}
else{
  alert(response.data.message);
}
  }
  return (
    <div className='login-popup'>
    <form onSubmit={onLogin} action="" className="login-popup-container">
      <div className="login-popup-title">
        <h2>{currstate}</h2>
        <img onClick={()=>setshowlogin(false)} src={cross_icon} alt="" />
      </div>
      <div className="login-popup-inputs">
        {currstate==="Login"?<></>: <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your name' required/>}
        <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email' required/>
        <input type="password" name='password' onChange={onchangeHandler} value={data.password} placeholder='Password' required/>
      </div>
      <button type='submit'>{currstate==="Sign Up"?"Create account":"Login"}</button>
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
