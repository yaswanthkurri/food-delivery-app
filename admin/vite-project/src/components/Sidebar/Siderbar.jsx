import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets.js';
import { NavLink } from 'react-router-dom';
const Siderbar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
<img src={assets.add_icon} alt="" />
<p>Add items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
<img src={assets.order_icon} alt="" />
<p>List items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
<img src={assets.order_icon} alt="" />
<p>Orders</p>
        </NavLink>

      </div>

    </div>
  )
}

export default Siderbar;
//**`App.jsx` is the main (root) component that combines and renders all the smaller components (like `Navbar`, `Sidebar`, and `Footer`) to build the complete user interface of the application.**
