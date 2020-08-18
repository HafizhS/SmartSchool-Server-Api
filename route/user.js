const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const jwt = require('jsonwebtoken');
const route = express.Router();

const accessSecret = require('../functions.js').getAccessTokenSecret();
const refreshSecret = require('../functions.js').getRefreshTokenSecret();

route.get('/users',middleware.authenticateToken, async function(req,res) {
    return res.send(await db.model.User.findAll({
        include: [{
            model: db.model.Role
        }]
    }));
});

route.get('/users/detail',middleware.authenticateToken, async function(req,res){
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

    // db.sequelize.query(query).then(data => {
    //     return res.send(data);
    // })
    
});

module.exports = route;