import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"


//app config
const app=express()
const port=4000

//middleware - whenever there is a req from fronted to backend it pass through middleware
app.use(express.json())
app.use(cors())//using cors() we can access any backend service from frontend

//db connection
connectDB();

//API endpoint
app.use("/api/food",foodRouter);//if a req start with /api/food it send it to foodRouter
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
res.end("API is not working :")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
//mongodb+srv://yaswanth:mdq69j@cluster0.i0dnrhb.mongodb.net/?appName=Cluster0
