const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const functions = require('../functions');
const multer = require('multer');
const route = express.Router();
const fs = require('fs');

var storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

const accessSecret = require('../functions.js').getAccessTokenSecret();
const refreshSecret = require('../functions.js').getRefreshTokenSecret();


// route.use(middleware.authenticateToken)

route.get('/users', async function(req,res) {
    return res.send(await db.model.User.findAll({
        include: [{
            model: db.model.Role
        }]
    }));
});

function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
}

route.post('/user/profile',upload.fields([{name: 'avatar', maxCount: 1},{name: 'cover', maxCount: 1}]),middleware.authenticateToken,function(req,res,next) {
    // optional
    // nickname | text
    // fullname | text
    // avatar | image
    // cover | image
    
    var updatedValue = {
        nickname: req.body.nickname || undefined,
        fullname: req.body.fullname || undefined,
        avatar_url: req.body.avatar_url || undefined,
        cover_url: req.bosy.cover_url || undefined
    };
    
    clean(updatedValue);

    db.models.UserDetails.update(updatedValue,{
        where: {
            id: req.user.id
        },
        
    }).then(data => {
        return res.send(data);
    }).catch(error => {
        return next(error);
    });
});

route.get('/user/profile',middleware.authenticateToken,function(req,res,next) {
    var query = `select u.id, ud.nickname, ud.fullname, ud.avatar_url,ud.cover_url, r.role
            from user as u
            join user_details ud on u.id = ud.id
            join role r on u.id_role = r.id
            where u.id = ${req.user.id};`
    db.sequelize.query(query,{
        type: QueryTypes.SELECT,
        nest: true
    }).then(data => {
        return res.status(200).send(data[0]);
    }).catch(error => {
        return next(error);
    });

    /*
    role_detail: {
        unique_identity: {
            type: "nis" / "nip"
            identity: 1010101010
        }
    }
    */

    // TODO
    // guru:
    // nip

    // siswa:
    // nis
    // kelas
});

route.get('/users/detail', async function(req,res){
    var query = "select u.email, r.role, ud.nickname, ud.fullname from user_details as ud join user u on ud.id = u.id join role r on u.id_role = r.id;";
    db.models.User.findAll({
        attributes: {
            exclude: 'password'
        },
        include:[{
            model: db.models.UserDetails
        },{
            model: db.models.Role
        }]
    }).then(data => {
        return res.send(data);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(400);
    });
});

module.exports = route;