const express = require('express');
const db = require('../config/database');
const middlewares = require('../middlewares');
const functions = require('../functions');
const route = express.Router();


route.get('/jurusan',function(req,res,next) {
    db.models.Jurusan.findAll().then(data => {
        return res.status(200).send(data);
    }).catch(err => {
        next(err);
    });
});

route.post('/jurusan',middlewares.requiredFields(["jurusan"]),function(req,res,next) {
    var insertedValue = {
        jurusan: req.body.jurusan,
        jurusan_singkatan: req.body.jurusan_singkatan || undefined
    };
    console.log(insertedValue);
    db.models.Jurusan.create(insertedValue).then(data => {
        return res.status(201).send(data);
    }).catch(err => {
        return next(err);
    });
});

route.delete('/jurusan/:id(\\d+)',function(req,res,next) {
    var { id } = req.params;
    db.models.Jurusan.findByPk(id).then(data => {
        data.destroy().then(result => {
            return res.status(200).send(result);      
        }).catch(err => {
            return next(err);
        });
    }).catch(err => {
        return res.sendStatus(404);
    });
});

route.patch('/jurusan/:id(\\d+)',function(req,res,next) {
    var { id } = req.params;
    var updatedValues = {
        jurusan: req.body.jurusan || undefined,
        jurusan_singkatan: req.body.jurusan_singkatan || undefined
    };
    functions.cleanProperty(updatedValues);
    db.models.Jurusan.update(updatedValues,{
        where: {
            id: id
        }
    }).then(data => {
        return res.status(200).send(updatedValues);      
    }).catch(err => {
        return res.sendStatus(404);
    });
});

module.exports = route;