// libs
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const chalk = require('chalk');

// api
const auth = require('./api/auth.js');

// utils
const posts = require('./api/posts.js');
const authenticateUser = require('./utils/authenticateUser.js');

// mongo db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('mongodb+srv://test:1234@cluster0-prnef.gcp.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});
mongoose.Promise = global.Promise;

// express setup
const app = express();
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express routers
app.use('/', auth);
app.use(express.static(path.join(__dirname, 'public')))
// app.use('/posts', authenticateUser, posts);
app.get('/cool', (req, res) => res.send(cool()))
// start
app.listen(PORT, () => console.log(`VUE TIL SERVER IS RUNNING ON ${PORT}`));
