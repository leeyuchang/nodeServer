// libs
const bcrypt = require('bcrypt');
const Router = require('express');

// modules
const newToken = require('../utils/newToken.js');
// const newToken = require('../utils/authTest.js');
const UserModel = require('../models/UserModel.js');

// router init
let router = Router();

// router
router.post('/login', (req, res) => {
  // find the user
  UserModel.findOne({
    username: req.body.username,
  }).then(user => {
    console.log('user', user);
    if (!user) {
        return res.status(401).send('Authentication failed. User not found.');
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          console.log('bcrypt.compare error : ', error);
          return res.status(500).send('Internal Server Error');
        }
        if (result) {
          // create token with user info
          const token = newToken(user);
          console.log('token', token);

          // current logged-in user
          const loggedInUser = {
            username: user.username,
            nickname: user.nickname,
          };

          // return the information including token as JSON
          res.status(200).json({
            success: true,
            user: loggedInUser,
            message: 'Login Success',
            token: token,
          });
        } else {
          return res.status(401).json('Authentication failed. Wrong password.');
        }
      });
    })
    .catch(error => {
      return res.status(500).json('Internal Server Error');
      throw error;
    });
});

// router.post('/signup', (req, res) => {
//   const { username, password, nickname } = req.body;
//   // encrypt password
//   // NOTE: 10 is saltround which is a cost factor
//   bcrypt.hash(password, 10, (error, hashedPassword) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({
//         error,
//       });
//     } else {
//       const newUser = new UserModel({
//         username,
//         password: hashedPassword,
//         nickname,
//       });
//       newUser.save((error, saved) => {
//         if (error) {
//           console.log(error);
//           res.status(409).send(error);
//         } else {
//           console.log(saved);
//           res.send(saved);
//         }
//       });
//     }
//   });
// });

// const SECRET_KEY = 'vuex-with-token';
// const EXPIRATION_DATE = '100d';

// // module.exports =
// newToken = user => {
//   console.log('newToken', user);
//   const payload = {
//     username: user.username,
//     _id: user._id,
//   };
//   return jwt.sign(payload, SECRET_KEY, {
//     expiresIn: EXPIRATION_DATE,
//   });
// };

// exports.router;
module.exports = router;