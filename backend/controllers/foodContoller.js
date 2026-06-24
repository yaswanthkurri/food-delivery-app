import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addfood=async(req,res)=>{
        
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image file is required. Send multipart/form-data with a field named 'image'."
        });
    }

    let image_filename = req.file.filename;
    const food = new foodModel(
        {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
        }
    )
    try {
        await food.save(); //food saved here
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"});
    }

}

//all food list
const foodlist=async(req,res)=>{
    try {
        const foods=await foodModel.find({});//conatins data about food 
    res.json({success:true,data:foods});//sending response in json format
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
    

}

export {addfood,foodlist}