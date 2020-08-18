const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const {
    QueryTypes
} = require('sequelize');
const route = express.Router();

route.get('/siswa', async function (req, res) {
    var siswa = await db.model.siswa.findAll();
    return res.send(siswa);
});

route.get('/siswa/tugas', middleware.authenticateToken, async function (req, res) {
    var userId = req.user.id;
    var tugas = db.sequelize.query("select t.tugas, k.kelas, st.submited_at, kt.tanggal_mulai, kt.tanggal_berakhir, p.nama_pelajaran, ts.status, ud.nickname AS guru from siswa_tugas as st join kelas_tugas kt on st.id_kelas_tugas = kt.id join tugas t on kt.id_tugas = t.id join pelajaran p on t.id_pelajaran = p.id join tugas_status ts on st.id_tugas_status = ts.id join guru g on t.id_guru = g.id join kelas k on kt.id_kelas = k.id left join user u on g.id = u.id left join user_details ud on u.id = ud.id where st.id_user = :iduser", {
        replacements: {
            iduser: userId
        },
        type: QueryTypes.SELECT
    }).then(data => {
        return res.send(data);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(400);
    });


    // var tugasSiswa = await db.models.SiswaTugas.findAll({
    //     where: {n 
    //         id_user: userId
    //     },
    //     include: {
    //         model: db.models.KelasTugas,
    //         include: {
    //             model: db.models.Tugas
    //         }
    //     }
    // });
    // return res.send(tugasSiswa);
});

route.get('/siswa/:id(\\d+)/tugas', middleware.authenticateToken, function (req, res) {
    return res.send('daftar tugas murid');
});


module.exports = route;