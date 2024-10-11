/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import mongoose from "mongoose";
import User from "./models/user";
import List from "./models/list";
import Like from "./models/like";
import Review from "./models/review";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      if (!mongoose.models.User) {
        mongoose.model("User", User.schema);
      }

      if (!mongoose.models.List) {
        mongoose.model("List", List.schema);
      }

      if (!mongoose.models.Like) {
        mongoose.model("Like", Like.schema);
      }

      if (!mongoose.models.Review) {
        mongoose.model("Review", Review.schema);
      }

      console.log("Connected to MongoDB!");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
