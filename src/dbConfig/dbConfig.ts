import mongoose from "mongoose";

export async function connection() {
    try {
        // const uri = process.env.MONGODB_URI;
        // if (!uri) {
        //     throw new Error("MONGODB_URI environment variable is not defined");
        // }
        // await mongoose.connect(uri) -> we can also use this;
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected',() => {
            console.log("MongoDB connected");
            
        })
    } catch (error) {
        console.log("Something went wrong in connecting the DB"+error);
        
    }
}