import userModel from "../models/userModel.js";

// add items to cart
const addTocart = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({ success: false, message: "User not authorized" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
};

// remove items from cart
const removeFromCart = async (req, res) => {
    // try {
    //     const userId = req.body.userId;
    //     const itemId = req.body.itemId;

    //     if (!userId || !itemId) {
    //         return res.json({ success: false, message: "Missing user or item id" });
    //     }

    //     const userData = await userModel.findById(userId);
    //     if (!userData) {
    //         return res.json({ success: false, message: "User not found" });
    //     }

    //     const cartData = userData.cartData || {};
    //     if (!cartData[itemId]) {
    //         return res.json({ success: true, message: "Item not in cart" });
    //     }

    //     if (cartData[itemId] > 1) {
    //         cartData[itemId] -= 1;
    //     } else {
    //         delete cartData[itemId];
    //     }

    //     await userModel.findByIdAndUpdate(userId, { cartData });
    //     return res.json({ success: true, message: "Removed from cart" });
    // } catch (error) {
    //     console.log(error);
    //     return res.json({ success: false, message: "Error" });
    // }
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"});

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({ success: false, message: "User not authorized" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
};

export { addTocart, removeFromCart, getCart };