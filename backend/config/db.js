import mongoose from "mongoose"
export const connectDB=async ()=>{
await mongoose.connect('mongodb+srv://yaswanth:mdq69j@cluster0.i0dnrhb.mongodb.net/food-delivery-app').then(
    ()=>console.log("database connected :")
)
}
//“Create a function named connectDB which connects Node.js backend to MongoDB Atlas database using mongoose,
//  and print a success message after connection.”