const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Order Service...');
  } catch (err) {
    console.error('Order Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;