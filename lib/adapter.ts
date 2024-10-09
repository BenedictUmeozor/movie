// Adapter for lucia

import connectDB from "./db";
import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

connectDB();

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users"),
);
