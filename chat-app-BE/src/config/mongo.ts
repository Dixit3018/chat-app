import mongoose from "mongoose";

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/chat_app";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export { connectDB };
