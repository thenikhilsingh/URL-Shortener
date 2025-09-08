import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

import { env } from "./env.js";
console.log("env:", env);
console.log("env.MONGODB_URL:", env.MONGODB_URL);
console.log("env.MONGODB_DATABASE_NAME:", env.MONGODB_DATABASE_NAME);

export const dbClient = new MongoClient(env.MONGODB_URL);
