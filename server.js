require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/database');
const admin = require('firebase-admin');

const serviceAccount = __dirname+"/salaam-bos-firebase-adminsdk-sk86f-5e693cd320.json";

app.listen(3000, async function () {
    console.log("Server started");
    try {
        await db.sequelize.authenticate();

        console.log('Connection has been established successfully.');
        
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://salaam-bos.firebaseio.com"
})

const middlewares = require('./middlewares');
app.use('/public',express.static('public'));
app.use('/storage',middlewares.authenticateToken,express.static('storage'));

var auth = require('./route/auth');
var siswa = require('./route/siswa');
var kelas = require('./route/kelas');
var tugas = require('./route/tugas');
var user = require('./route/user');
var tutorial = require('./route/tutorial');
var berita = require('./route/berita');
var upload = require('./route/upload');
var mataPelajaran = require('./route/mata_pelajaran');
var jurusan = require('./route/jurusan');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', auth);
app.use('/', siswa);
app.use('/', kelas);
app.use('/', tugas);
app.use('/', user);
app.use('/', tutorial);
app.use('/', berita);
app.use('/', upload);
app.use('/', mataPelajaran);
app.use('/', jurusan);

module.exports = app;