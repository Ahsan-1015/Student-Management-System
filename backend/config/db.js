const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB: Using existing connection');
    return mongoose.connection;
  }

  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_db';
    const conn = await mongoose.connect(mongoURI);
    
    // Log the connection details
    const host = conn.connection.host || 'localhost';
    console.log(`MongoDB Connected: ${host}`);
    return conn;
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;