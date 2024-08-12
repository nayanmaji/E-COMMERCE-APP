const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
