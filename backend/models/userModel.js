import mongoose from 'mongoose'
const userSchema= new mongoose.Schema({
   name:{type:string,required:true},
   email:{type:string,required:true},
   password:{type:string,required:true},
   cartData:{type:Object,default:{}}
}, {minimize:false}) //minimize: true (default): Empty objects are removed from the document.
//minimize: false: Empty objects are saved in the database.

const userModel=mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;
