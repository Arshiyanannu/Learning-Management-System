// Handles connection to MongoDB using Mongoose.
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Hardcode your production fallback string directly here
    const dbURI = process.env.MONGO_URI || "mongodb+srv://Admin:YourActualPasswordHere@cluster0.dxjbvce.mongodb.net/edulms?retryWrites=true&w=majority";

    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;