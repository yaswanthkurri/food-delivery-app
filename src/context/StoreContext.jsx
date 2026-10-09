import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setcartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, settoken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data || []);
            }
        } catch (error) {
            console.log("Food fetch error:", error);
        }
    };

    const addtocart = (itemid) => {
        if (!cartItems[itemid]) {
            setcartItems(prev => ({ ...prev, [itemid]: 1 }));
        } else {
            setcartItems(prev => ({ ...prev, [itemid]: prev[itemid] + 1 }));
        }
    };

    const removeFromcart = (itemid) => {
        setcartItems((prev) => {
            const next = { ...prev };
            if (!next[itemid]) return prev;
            if (next[itemid] <= 1) {
                delete next[itemid];
                return next;
            }
            next[itemid] = next[itemid] - 1;
            return next;
        });
    };

    const getTotalCartAmount = () => {
        let totalamount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                if (iteminfo) {
                    totalamount += cartItems[item] * iteminfo.price;
                }
            }
        }
        return totalamount;
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextvalue = {
        food_list,
        cartItems,
        setcartItems,
        addtocart,
        removeFromcart,
        getTotalCartAmount,
        url,
        token,
        settoken
    };

    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;