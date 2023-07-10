const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    const env = 'development';
    const { MONGODBURI } = config.get(env);
    console.log(MONGODBURI)
    await mongoose.connect(MONGODBURI, {
      useNewUrlParser: true
    });

    console.log('MongoDB is connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;