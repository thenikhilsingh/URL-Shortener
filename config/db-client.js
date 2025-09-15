// import dotenv from "dotenv";
// dotenv.config();
// import { MongoClient } from "mongodb";

// import { env } from "./env.js";
// console.log("env:", env);
// console.log("env.MONGODB_URI:", env.MONGODB_URI);
// console.log("env.MONGODB_DATABASE_NAME:", env.MONGODB_DATABASE_NAME);

// export const dbClient = new MongoClient(env.MONGODB_URI);

import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};
