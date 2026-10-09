import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext=createContext(null);
const StoreContextProvider=(props)=>{
    const [cartItems,setcartItems]=useState({});
    const url="http://localhost:4000";
    const [token,settoken]=useState("");
    const [food_list, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data || []);
            }
        } catch (error) {
            console.log("Food fetch error:", error);
        }
    };

    const addtocart=async (itemid)=>{
        if(!cartItems[itemid]){
            setcartItems(prev=>({...prev,[itemid]:1}));
        } else {
            setcartItems(prev=>({...prev,[itemid]:prev[itemid]+1}));
        }
           if(token){
            await axios.post(url+"/api/cart/add",  { itemId: itemid },{headers:{token}});
        }
       
    }

    const removeFromcart=async (itemid)=>{
        setcartItems((prev)=>({...prev,[itemid]:prev[itemid]-1}));
         if(token){
            await axios.post(url+"/api/cart/remove",{ itemId: itemid },{headers:{token}});
        }
    }

    const getTotalCartAmount=()=>{
        let totalamount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
                if(iteminfo){
                    totalamount += cartItems[item] * iteminfo.price;
                }
            }
        }
        return totalamount;
    }
const loadCartdata=async (token)=>{
const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
setcartItems(response.data.cartData);
}
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"));
                await loadCartdata(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextvalue={
        food_list,
        cartItems,
        setcartItems,
        addtocart,
        removeFromcart,
        getTotalCartAmount,
        url,
        token,
        settoken
    }

    return(
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;