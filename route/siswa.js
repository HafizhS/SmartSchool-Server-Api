const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const route = express.Router();

route.get('/siswa', async function(req,res) {
    var siswa = await db.siswa.findAll();
    return res.send(siswa);
});

route.get('/siswa/tugas',middleware.authenticateToken,function(req,tes) {
});

route.get('/siswa/:id(\\d+)/tugas',middleware.authenticateToken,function(req,res) {
    return res.send('daftar tugas murid');
});


module.exports = route;