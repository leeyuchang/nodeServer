// json related
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'vuex-with-token';
const EXPIRATION_DATE = '100d';

module.exports = newToken = user => {
  console.log('newToken', user);
  const payload = {
    username: user.username,
    _id: user._id,
  };
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRATION_DATE,
  });
};
