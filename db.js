import mongoose from "mongoose" ;
import { LOCAL_MONGODB_URI } from "./config/env.js";



// const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
// const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;

const connectToMongo = async () => {
    if (!LOCAL_MONGODB_URI) {
        console.error("Error: LOCAL_MONGODB_URI is not defined in .env file");
        process.exit(1);
    }
    
    try {
        await mongoose.connect(LOCAL_MONGODB_URI)
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with failure code
    }
}

export default connectToMongo ;