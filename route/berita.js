const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const route = express.Router();

const admin = require('firebase-admin');
var firebasedb = admin.database();
var ref = firebasedb.ref("Berita");

route.post('/berita',middleware.requiredFields(['id_user','title','content']),function(req,res,next) {
    var {id_user: idUser,title,content} = req.body;

    db.models.Berita.create({
        id_user: idUser,
        title: title,
        content: content,
    }).then(data => {
        ref.update({
            last_updated: new Date(Date.now())
        });
        return res.status(201).send(data);
    }).catch(error => {
        console.log(error);
        return res.sendStatus(400);
    });
    
});

route.get('/berita', function(req,res,next) {
    var idUser = req.query.iduser;
    var id = req.query.id;
    db.models.Berita.findAll({
        include: {
            model: db.models.User,
            include: {
                model: db.models.UserDetails,
            }
        },
        order: [
            ['created_at','DESC']
        ]
    }).then(data => {
        var respone = data.map(value => {
            return {
                id: value.id,
                title: value.title,
                content: value.content,
                createdAt: value.createdAt,
                updatedAt: value.createdAt,
                author: {
                    id: value.user.id,
                    nickname: value.user.user_detail.nickname,
                    fullname: value.user.user_detail.fullname
                }
            };
        });
        return res.status(200).send(respone);
    }).catch(error => {
        return next(error);
    });
    
});


module.exports = route;