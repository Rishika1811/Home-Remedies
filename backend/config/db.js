const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set in environment variables.");
    }

    const connectionInstance = await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || "home_remedies",
    });

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
