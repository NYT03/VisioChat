const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/Meetingcode'; // Replace with your details

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString); // Replace with your actual connection string
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process on error
  }
};

async function disconnectDB() {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

module.exports = { connectDB, disconnectDB };
