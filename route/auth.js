const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require('../middlewares');
const db = require('../config/database');
const route = express.Router();

const accessSecret = require('../functions.js').getAccessTokenSecret();
const refreshSecret = require('../functions.js').getRefreshTokenSecret();

const Users = require('../models/user')(db);
const Role = require('../models/role')(db);


route.get('/login', async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    try {
        var user = await Users.findOne({
            where: {email: email,password: password},
            attributes: ['id','email'],
            include: [{
                model: Role,
                attributes: ['role']
            }]
        });

        if(!user || user.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'wrong email or password!'
            });
        }

        var accessToken = generateAccessToken(user.toJSON());
        var refreshToken = generateRefreshToken(user.toJSON());

        return res.send({
            success: true,
            access_token: accessToken,
            refresh_token: refreshToken
        });

    }catch (error) {
        return res.status(400).send({
            success: false,
            error_message: error
        });
    }
});

function generateAccessToken(user) {
    var accessToken = jwt.sign(user,accessSecret,{expiresIn: '2h'});
    return accessToken;
}

function generateRefreshToken(user) {
    var refreshToken = jwt.sign(user,refreshSecret,{expiresIn: '6d'});
    return refreshToken;
}


route.get('/verify', middleware.authenticateToken, function(req,res) {
    return res.json(req.user);
});

route.post('/register',function (req,res) {

});

route.get('/user', async function(req,res) {
    return res.send(await Users.findAll({
        include: [{
            model: Role
        }]
    }));
});



module.exports = route;