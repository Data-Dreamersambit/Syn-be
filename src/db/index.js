import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const coonectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected at ${coonectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(` Mongodb connection failed`, error);
        process.exit(1);
    }
}

export default connectDB;