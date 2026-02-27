const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conncetd successfully");

    console.log("Connected Host:", conn.connection.host);
    console.log("Connected DB Name:", conn.connection.name);
    
  } catch (err) {
    console.error("Mongo db connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
