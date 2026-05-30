import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets1'
import rating_icon from '../../assets/rating_starts.png'
import add_icon_white from '../../assets/add_icon_white.png'
import remove_icon from '../../assets/remove_icon_red.png'
import add_icon_green from '../../assets/add_icon_green.png'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {
  const{cartItems,addtocart,removeFromcart}=useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} className='food-item-image' alt="" />
        {
        !cartItems[id]
         ?<img className='add' onClick={()=>addtocart(id)} src={add_icon_white} alt=''/>
        : <div className="food-item-counter">
          <img  onClick={()=>removeFromcart(id)} src={remove_icon} alt=""/>
          <p>{cartItems[id]}</p>
          <img  onClick={()=>addtocart(id)} src={add_icon_green} alt="" />
        </div>}
  
         </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={rating_icon} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  
    )
  }


export default FoodItem;
