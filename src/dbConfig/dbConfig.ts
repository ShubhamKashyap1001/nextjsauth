import mongoose from "mongoose";
import { log } from "node:console";

export async function connect() {
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

        connection.on('error',(err) => {
            console.log("MongoDb connection Error, Please ensure that DB is up or running : " + err)
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting the DB"+error);
        
    }
}