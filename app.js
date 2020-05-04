// libs
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const chalk = require('chalk');

// api
const auth = require('./api/auth.js');

// utils
const posts = require('./api/posts.js');
const authenticateUser = require('./utils/authenticateUser.js');

// mongo db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!!'));
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true}); // reference on heroku env
mongoose.Promise = global.Promise;

// express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express routers
app.use('/', auth);
app.use('/posts', authenticateUser, posts);
app.use(express.static(path.join(__dirname, 'public')))
app.get('/cool', (req, res) => res.send(cool()))

// node server start
app.listen(PORT, () => console.log(`VUE SERVER IS RUNNING ON ${PORT}`));
