const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const route = express.Router();

route.get('/kelas', async function (req, res) {
    var kelas = await db.model.Kelas.findAll();
    return res.send(kelas);
});

route.get('/kelas/:kelas', middleware.authenticateToken, async function (req, res) {
    var paramKelas = req.params.kelas;
    var detailKelas = await db.model.Kelas.findOne({
        where: {
            kelas: paramKelas
        }
    });

    return res.send(detailKelas).status(200);
});

route.get('/kelas/:kelas/siswa', middleware.authenticateToken, async function (req, res) {
    var paramsKelas = req.params.kelas;
    var siswaKelas = await db.model.Siswa.findAll({
        include: [{
            model: db.model.Kelas,
            where: {
                kelas: paramsKelas
                
            },
            attributes: []
        }]
    });

    return res.send(siswaKelas);
});

route.get('/kelas/:kelas/walikelas', middleware.authenticateToken, async function (req, res) {
    var paramsKelas = req.params.kelas;
    var siswaWaliKelas = await db.model.Guru.findOne({
            include: {
                model: db.model.Kelas,
                where: {kelas: paramsKelas},
                attributes: []
            }
    });
    return res.send(siswaWaliKelas).status(200);
});

route.post('/kelas/:kelas/tugas/:tugas(\\d+)/add', middleware.authenticateToken, async function (req, res) {
    var kelas = req.params.kelas;
    var idTugas = req.params.tugas;

    var kelas = await db.models.Kelas.findOne({
        where: {
            kelas: kelas
        }
    });

    if (!kelas) {
        return res.sendStatus(400);
    }

    db.models.KelasTugas.create({
       id_kelas: kelas.id,
       id_tugas: idTugas
    }).then(data => {
        console.log(data);
        return res.status(201).send(data);
    }).catch(err => {
        console.error(err);
        return res.sendStatus(400);
    });

});

module.exports = route;