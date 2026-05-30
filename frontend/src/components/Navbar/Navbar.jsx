import React,{useContext, useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets1'
import basket_icon from '../../assets/basket_icon.png'
import serach_icon from '../../assets/search_icon.png'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setshowlogin}) => {
  const[menu,setMenu]=useState("home");
  const{getTotalCartAmount}=useContext(StoreContext);
  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} className='logo' /></Link>
      <ul className='navbar-menu'>
<Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
<a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
<a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
<a href='#footer'  onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={serach_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={basket_icon}/></Link>
           <div className={getTotalCartAmount()===0?"":"dot"}> </div>
        </div>
       <button onClick={()=>setshowlogin(true)}>Sign-in</button>
      </div>
    </div>
  )
}
export default Navbar;
