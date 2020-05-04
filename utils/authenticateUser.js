const UserModel = require('../models/UserModel.js');

module.exports = authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'token must be included' });
  }

  const token = req.headers.authorization;
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({ message: 'token is invalid' });
  }

  const user = await UserModel.findById(payload._id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).json({ message: 'user is not found' });
  }

  req.user = user;
  next();
};