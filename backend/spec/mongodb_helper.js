const mongoose = require('mongoose');
const config = require('config');
const { MONGODBURI } = config.get('test');

console.log('We\'re in the mongoDB helper')

// afterAll( async () => {
//   await mongoose.disconnect();
// });

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
