const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const url=process.env.DATABASE_STREAM_URL;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Propagate error to be handled in app.js
  }
};

module.exports = { connectDB };
