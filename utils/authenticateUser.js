const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');

const SECRET_KEY = 'vuex-with-token';

function verifyToken(token) {
 return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
}

module.exports = authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'token must be included' });
  }

  const token = req.headers.authorization;
  let payload;
  try {
    payload = await verifyToken(token);
    console.log('payload',payload);
    
  } catch (e) {
    return res.status(401).json({ message: 'token is invalid' });
  }

  const user = await UserModel.findById(payload._id)
    .select('-password') // select all except for password
    .lean()
    .exec();

  if (!user) {
    return res.status(401).json({ message: 'user is not found' });
  }

  req.user = user;
  next();
};

