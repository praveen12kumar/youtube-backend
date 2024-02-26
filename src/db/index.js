import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error("MONGO_URI not found in environment variables.");
            process.exit(1);
        }
        const connection = await mongoose.connect(`${mongoURI}/${DB_NAME}`);
        console.log(`MongoDB connected!! DB_HOST: ${connection.connection.host}`);
    } catch (error) {
        console.error("MONGODB connect error:", error);
        process.exit(1);
    }
};

export default connectDB;
