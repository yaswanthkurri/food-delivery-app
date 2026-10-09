import React,{useContext, useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets1'
import basket_icon from '../../assets/basket_icon.png'
import serach_icon from '../../assets/search_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setshowlogin}) => {
  const[menu,setMenu]=useState("home");
  const{getTotalCartAmount,token,settoken}=useContext(StoreContext);
  const navigate=useNavigate();
  const logout=()=>{
localStorage.removeItem("token");//pass key name to remove that
settoken("");//now token is empty
navigate("/");//after logout it navigates to home page
  }
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
        {!token ? (
          <button onClick={()=>setshowlogin(true)}>Sign-in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )

}
export default Navbar;
