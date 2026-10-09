import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js' //This is a shorthand way of loading environment variables from a .env file.
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import { fileURLToPath } from "node:url"
//otenv automatically reads the .env file and stores the values in:process.env like below
//process.env.PORT;
//process.env.JWT_SECRET;



//app config
const app=express()
const port=process.env.PORT || 4000
const uploadsPath=fileURLToPath(new URL("./uploads", import.meta.url))

//middleware - whenever there is a req from fronted to backend it pass through middleware
app.use(express.json())
app.use(cors())//using cors() we can access any backend service from frontend

app.use("/api",async(req,res,next)=>{
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:",error.message);
        res.status(503).json({success:false,message:"Database unavailable"});
    }
});
//API endpoint
app.use("/api/food",foodRouter);//if a req start with /api/food it send it to foodRouter
app.use("/images",express.static(uploadsPath))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.get("/",(req,res)=>{
res.end("Food delivery API is running")
})

if (process.env.NODE_ENV !== "production") {
    app.listen(port,()=>{
        console.log(`Server started on http://localhost:${port}`)
    })
}

export default app
