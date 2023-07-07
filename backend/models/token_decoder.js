const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const tokenDecoder = (token) => {
  try {
    const decoded = jwt.decode(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = tokenDecoder;