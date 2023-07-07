const mongoose = require('mongoose');
const config = require('config');
const { MONGODBURI } = config.get('test');

console.log('hello')

const connectTestDB = async () => {
  try {
    await mongoose.connect(MONGODBURI, {
      useNewUrlParser: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectTestDB;