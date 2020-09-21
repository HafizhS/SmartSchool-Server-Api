const express = require('express');
const db = require('../config/database');
const middlewares = require('../middlewares');
const functions = require('../functions');
const route = express.Router();

route.get('/mata-pelajaran',function(req,res,next) {
    db.models.Pelajaran.findAll().then(data => {
        return res.status(200).send(data);
    });
});

route.post('/mata-pelajaran',middlewares.requiredFields(["nama_pelajaran"]),function(req,res,next) {
    var { nama_pelajaran } = req.body;
    db.models.Pelajaran.create({
        nama_pelajaran: nama_pelajaran
    }).then(data => {
        return res.status(201).send(data);
    }).catch(err => {
        return next(err);
    });

});

route.delete('/mata-pelajaran/:id(\\d+)',function(req,res,next) {
    var { id } = req.params;
    db.models.Pelajaran.findByPk(id).then(data => {
        data.destroy().then(result => {
            return res.status(200).send(result);      
        }).catch(err => {
            return next(err);
        });
    }).catch(err => {
        return res.sendStatus(404);
    });
});

route.patch('/mata-pelajaran/:id(\\d+)',function(req,res,next) {
    var { id } = req.params;
    var updatedField = {
        nama_pelajaran: req.body.nama_pelajaran || undefined
    };
    functions.cleanProperty(updatedField);
    db.models.Pelajaran.update(updatedField, {
        where:{
            id: id
        }
    }).then(data => {
        data.destroy().then(result => {
            return res.status(200).send(result);      
        }).catch(err => {
            return next(err);
        });
    }).catch(err => {
        return res.sendStatus(404);
    });
});

module.exports = route;