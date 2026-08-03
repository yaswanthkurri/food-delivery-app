import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
// Validate the input (validator).
// Hash the password before storing it (bcrypt).
// Store/Retrieve user data from MongoDB (userModel).
// Authenticate users with tokens (jwt).

//login user
const loginUser=async(req,res)=>{
    

}
//create token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
//register user
const registerUser= async(req,res)=>{
    const{name,email,password}=req.body;
    try {
        // checking is user already exists
     const exists=await userModel.findOne({email});
     if(exists){
        return res.json({success:false,message:"User Already Exists"});
     }
     //validating email format & strong password
     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"});
     }
     if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"});
     }
     const salt=await bcrypt.genSalt(10);//genSalt(10) creates a random salt(string) with a cost factor of 10.
     const hashedPassword=await bcrypt.hash(password,salt); //hash() combines the password and salt to create a secure hash.
//Store only hashedPassword in the database.
const newUser=new userModel({
    name:name,
    email:email,
    password:hashedPassword

})
const user=await newUser.save();//saved user in database
const token=createToken(user._id);
res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
    
}
export { loginUser, registerUser };
