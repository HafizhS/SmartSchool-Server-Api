const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const route = express.Router();


route.use(middleware.authenticateToken);
route.post('/tugas/create', async function(req,res) {

    var guru = req.body.guru;
    var pelajaran = req.body.pelajaran;

    if (!guru || !pelajaran) {
        return res.sendStatus(400);
    }

    db.models.Tugas.create({
        id_guru: guru,
        id_pelajaran: pelajaran
    }).then(data => {
        console.log(data);
        return res.status(201).send(data);    
    }).catch(err => {
        console.log(err);
        return res.send(err);
    });
     
});

route.get('/tugas/:id(\\d+)',async function(req,res) {
    var tugas = req.params.id;
    if (!tugas) {
        return res.sendStatus(400);
    }

    var tugas = await db.models.Tugas.findOne({
        where: {
            id: tugas
        }
    });

    if(tugas) {
        return res.send(tugas).status(200);
    }else {
        return res.sendStatus(204);
    }

});
module.exports = route;