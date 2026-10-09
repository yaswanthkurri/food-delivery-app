import mongoose from "mongoose"
let connectionPromise;

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is required");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Database connected"))
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    await connectionPromise;
}
//“Create a function named connectDB which connects Node.js backend to MongoDB Atlas database using mongoose,
//  and print a success message after connection.”