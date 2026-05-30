
import mongoose from "mongoose";

// Define the structure of food documents in MongoDB
const foodSchema = new mongoose.Schema({
    
    // Name of the food item
    name: {
        type: String,
        required: true
    },

    // Description of the food item
    description: {
        type: String,
        required: true
    },

    // Price of the food item
    price: {
        type: Number,
        required: true
    },

    // Image filename or URL of the food item
    image: {
        type: String,
        required: true
    },

    // Category such as Pizza, Burger, Dessert, etc.
    category: {
        type: String,
        required: true
    }
});

// Create the model if it doesn't exist,
// otherwise use the already created model.
// This prevents OverwriteModelError during hot reloads.
const foodModel =
    mongoose.models.food ||
    mongoose.model("food", foodSchema);

// Export the model so it can be used in other files
// for database operations like create, find, update, and delete.
export default foodModel;