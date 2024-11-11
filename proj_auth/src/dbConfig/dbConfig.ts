import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection_instance = mongoose.connection
        // connection event 
        connection_instance.on("connected", () => {
            console.log("Database connected successfully");
        })
        // connection error event
        connection_instance.on("error", (error) => {
            console.log("Database connection error: ", error);
            process.exit(1)
        })
    } catch (error) {
        console.log("Database connection refused...");
        console.log(error);
              
    }
}