const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const { QueryTypes } = require('sequelize');
const route = express.Router();
const multer = require('multer');
const middlewares = require('../middlewares');
const functions = require('../functions');

route.get('/kelas', async function (req, res) {
    var kelas = await db.model.Kelas.findAll();
    return res.send(kelas);
});

route.post('/kelas',middlewares.requiredFields(["kelas"]),function(req,res,next) {
    var insertedValue = {
        kelas: req.body.kelas,
        id_kelas_walikelas: req.body.id_walikelas || undefined,
        id_jurusan: req.body.id_jurusan || undefined
    };
    functions.cleanProperty(insertedValue);
    db.models.Kelas.create(insertedValue).then(data => {
        return res.status(201).send(data);
    }).catch(err => {
        next(err);
    });
});

route.delete('/kelas/:id(\\d+)',function (req,res,next) {
    db.models.Kelas.findByPk(req.params.id).then(data=> {
        data.destroy().then(result => {
            return res.status(200).send(result);
        }).then(err => {
            next(err);
        });
    }).catch(err => {
        return res.sendStatus(404);
    });
});

route.patch('/kelas/:id(\\d+)',function(req,res,next) {
    var { id } = req.params;
    var updatedValues = {
        kelas: req.body.kelas || undefined,
        id_kelas_walikelas: req.body.id_walikelas || undefined,
        id_jurusan: req.body.id_jurusan || undefined
    };
    functions.cleanProperty(updatedValues);

    db.models.Kelas.update(updatedValues,{
        where: {
            id: id
        }
    }).then(data => {
        return res.status(200).send(updatedValues);      
    }).catch(err => {
        return res.sendStatus(404);
    });
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

route.get('/kelas/jadwal',function (req,res) {

});

route.get('/kelas/:kelas/jadwal',function (req,res) {
    var hariQuery = `${req.query.hari == undefined ? "" : `AND h.hari = "${req.query.hari}"`}`;
    var query = `select h.hari,k.kelas,p.nama_pelajaran,ud.nickname as guru,kjp.waktu_mulai,kjp.waktu_selesai
                from kelas as k
                join kelas_jadwal kj on k.id = kj.id_kelas
                join kelas_jadwal_pelajaran kjp on kj.id = kjp.id_kelas_jadwal
                join pelajaran p on kjp.id_pelajaran = p.id
                join guru g on kjp.id_guru = g.id
                join user_details ud on g.id = ud.id
                join hari h on kj.id_hari = h.id
                where k.kelas = "${req.params.kelas}"${hariQuery} order by h.hari desc`;
    db.sequelize.query(query, {
        type: QueryTypes.SELECT
    }).then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        return next(error);
    });
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