const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4, // 🔥 FIX for ECONNREFUSED on Windows
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

// Optional logs (ye rehne do)
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});

module.exports = connectDB;
