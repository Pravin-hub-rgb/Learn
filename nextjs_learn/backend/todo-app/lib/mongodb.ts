import mongoose from "mongoose";
import { cache } from "react";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;

  // hawa mai le gaya dekho yaha se . yeh Promise kya hota hai yeh kon sikhayega .. simple example se .. kyu hai kya hai ..
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error(".env.local mein MONGODB_URI nahi hai! Check karo.");
    }
    cached.promise = mongoose.connect(MONGODB_URI);
  }
}

export default connectDB;
