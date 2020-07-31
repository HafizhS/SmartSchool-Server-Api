require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/database');

app.listen(3000, async function () {
    console.log("Server started");
    try {
        await db.sequelize.authenticate();
        // await db.initModel;
        // console.log(await db.model.Guru.findOne());
        console.log('Connection has been established successfully.');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

// global.serverModel = db.model;

var auth = require('./route/auth');
var siswa = require('./route/siswa');
var kelas = require('./route/kelas');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', auth);
app.use('/', siswa);
app.use('/', kelas);


module.exports = app;