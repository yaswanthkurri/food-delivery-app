// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './placeorder.css'
// import { StoreContext } from '../../context/StoreContext'
// const Placeorder = () => {
//   const { getTotalCartAmount } = useContext(StoreContext)
//   const navigate = useNavigate()
//   return (
//     <div>
//       <form action="" className='place-order' onSubmit={(event) => {
//         event.preventDefault()
//         navigate('/order')
//       }}>
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <div className="multi-fields">
//             <input type="text" placeholder='First-name' required />
//             <input type="text" placeholder='Second-name' required />
//           </div>
//           <input type="email" placeholder='Email-address' required />
//           <input type="text" placeholder='street' required />
//           <div className="multi-fields">
//             <input type="text" placeholder='City' required />
//             <input type="text" placeholder='State' required />
//             <div className="multi-fields">
//             <input type="text" placeholder='Zip code' required />
//             <input type="text" placeholder='Country' required />
//           </div>
//           <input type="tel" placeholder='Phone' required />
//           </div>
//         </div>
//         <div className="place-order-right">
// <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//                    <p>Delivery Fee</p>
//                    <p>${getTotalCartAmount()===0?0:2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//             </div>
//           </div>
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Placeorder

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
const Placeorder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const[data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData({...data,[name]:value});
  }
  const placeorder= async(event)=>{
  event.preventDefault();
  let orderItems=[];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
  let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2
  }
  let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    console.log("Error");
  }
  }
  const navigate=useNavigate();
  useEffect(()=>{
    const storedToken=localStorage.getItem('token');
    if(!token && !storedToken){
      navigate('/cart');
    }
    else if(food_list.length > 0 && getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token,food_list,cartItems,navigate,getTotalCartAmount])

  return (
    <div>
      <form action="" onSubmit={placeorder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" required name='firstName' onChange={onChangehandler} value={data.firstName} placeholder='First-name'/>
            <input type="text" required name='lastName' onChange={onChangehandler} value={data.lastName} placeholder='Second-name'/>
          </div>
          <input type="email" required name='email' onChange={onChangehandler} value={data.email} placeholder='Email-address'/>
          <input type="text" required name='street' onChange={onChangehandler} value={data.street} placeholder='street' />
          <div className="multi-fields">
            <input  type="text" required name='city' onChange={onChangehandler} value={data.city} placeholder='City'/>
            <input type="text" required name='state' onChange={onChangehandler} value={data.state} placeholder='State'/>
            <div className="multi-fields">
            <input type="text" required name='zipcode' onChange={onChangehandler} value={data.zipcode} placeholder='Zip code'/>
            <input type="text" required name='country' onChange={onChangehandler} value={data.country} placeholder='Country'/>
          </div>
          <input type="number" required name='phone' onChange={onChangehandler} value={data.phone} placeholder='Phone' />
          </div>
        </div>
        <div className="place-order-right">
<div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                   <p>Delivery Fee</p>
                   <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          {/* <button onClick={()=>navigate("/order")} type='submit'>PROCEED TO PAYMENT</button> */}
                  <button  type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Placeorder;


 


 