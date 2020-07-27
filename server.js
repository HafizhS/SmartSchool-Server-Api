require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/database');

app.listen(3000, async function () {
    console.log("Server started");
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});


var auth = require('./route/auth');

app.use(express.urlencoded({ extended: true }));
app.use('/', auth);


module.exports = app;