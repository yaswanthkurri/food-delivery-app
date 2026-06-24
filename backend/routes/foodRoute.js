import express from "express"
import { addfood } from '../controllers/foodContoller.js'
import multer from "multer" //image storage system
import { foodlist } from "../controllers/foodContoller.js";

const foodRouter=express.Router();
// foodRouter.post("/add",addfood);

// Configure how uploaded files should be stored
const storage = multer.diskStorage({

    // Folder where uploaded files will be saved
    destination: "uploads",

    // Function to generate the filename for the uploaded file
    filename: (req, file, cb) => {

        // req  -> contains request data (body, params, etc.)
        // file -> contains uploaded file information
        // cb   -> callback function: cb(error, filename)

        // Date.now() creates a unique timestamp
        // file.originalname is the original file name uploaded by the user

        cb(null, `${Date.now()}${file.originalname}`);
    }
});

// Create multer middleware using the above storage configuration
const upload = multer({ storage: storage });
// POST request endpoint: /api/food/add
foodRouter.post(
    "/add",
    // Multer middleware
    // Accepts a single file from the field named "image"
    // Saves the file in the uploads folder
    // File information becomes available in req.file
    upload.single("image"),

    // Controller function
    // Runs after the image has been uploaded successfully
    // Can access:
    // req.file -> uploaded image details
    // req.body -> other form data (name, price, description, etc.)
    addfood
);

foodRouter.get("/list",foodlist);
export default foodRouter;
