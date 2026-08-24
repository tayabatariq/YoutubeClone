import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB  =  async()=>{
    try {
      const databaseconnection=  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`mngoose connected ${databaseconnection.connection.host}`)
    } catch (error) {
        console.log("Mongoose connection error",error)
        process.exit(1)
    }
}

export default connectDB