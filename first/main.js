const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

const users = require('./routes/users');
const config = require('./config/db');

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`express web server start with port number: ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
//json 활용 미들웨어
app.use(express.json());
//URL인코딩 데이터 활용 미들웨어
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);


mongoose.connect(config.db);
mongoose.connection.on('connected', function () {
    console.log(`${config.db} connected`);
});
mongoose.connection.on('error', function (err) {
    console.log(err);
});