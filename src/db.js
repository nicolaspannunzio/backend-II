import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
    process.env.DB_URI, { dbName: "products" });
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1); 
  }
};

export default connectDB;