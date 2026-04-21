import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.MONGO_URI);
  return mongoose.connection;
}
