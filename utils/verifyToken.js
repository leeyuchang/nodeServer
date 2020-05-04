// json related
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'vuex-with-token';

module.exports = verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
