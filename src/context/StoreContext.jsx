import { createContext, useEffect, useState } from "react";
import {food_list} from '../assets/assets';

export const StoreContext=createContext(null);
const StoreContextProvider=(props)=>{
    const[cartItems,setcartItems]=useState({})
    const addtocart=(itemid)=>{
if(!cartItems[itemid]){
setcartItems(prev=>({...prev,[itemid]:1}));

}
else{
setcartItems(prev=>({...prev,[itemid]:prev[itemid]+1}));
}
    }
    const removeFromcart=(itemid)=>{
        setcartItems((prev)=>({...prev,[itemid]:prev[itemid]-1}));
    }
    const getTotalCartAmount=()=>{
        let totalamount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
                totalamount+=cartItems[item]*iteminfo.price;
            }
        }
        return totalamount;
    }
    const contextvalue={
food_list,
cartItems,
setcartItems,
addtocart,
removeFromcart,
getTotalCartAmount

    }
    return(
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;