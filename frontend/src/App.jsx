import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import Login_popup from './components/Loginpopup/Login_popup'
import Verify from './pages/verify/verify'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {
  const[showlogin,setshowlogin]=useState(false);
  return (
    <>
    {showlogin?<Login_popup setshowlogin={setshowlogin} />:<></>}
    <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/order' element={<Placeorder/>}/>
  <Route path='/verify' element={<Verify/>}/>
  <Route path='/myorders' element={<MyOrders/>}/>
</Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
