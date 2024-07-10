const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
    throw err;
  }
}

async function disconnectDB() {
  if (client) {
    await client.close();
    db = null;
    console.log("MongoDB connection closed");
  }
}

module.exports = { connectDB, disconnectDB };
