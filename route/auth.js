const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const jwt = require('jsonwebtoken');
const route = express.Router();

const accessSecret = require('../functions.js').getAccessTokenSecret();
const refreshSecret = require('../functions.js').getRefreshTokenSecret();

const AuthData = require('../models/auth/authData');


route.get('/test', function(req,res) {
    return res.send("test !!!");
})

route.post('/login', async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: 'email or password cannot empty!'
        });
    }

    try {
        var user = await db.model.User.findOne({
            where: {email: email,password: password},
            attributes: ['id','email'],
            include: [{
                model: db.model.Role,
                attributes: ['role']
            }]
        });

        
        if(!user || user.length === 0) {
            return res.status(403).send({
                success: false,
                message: 'wrong email or password!'
            });
        }

        var userDetail = await db.model.UserDetails.findOne({
            where: {id: user.id}
        });
        

        var authData = new AuthData(user.id,user.email,userDetail.nickname,user.role.role);
        console.log(authData);
        var accessToken = generateAccessToken(authData);
        var refreshToken = generateRefreshToken(authData);

        return res.status(200).send({
            success: true,
            access_token: accessToken,
            refresh_token: refreshToken
        });

    }catch (error) {
        console.log(error);
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
    var refreshToken = jwt.sign(user,refreshSecret,{expiresIn: '2d'});
    return refreshToken;
}


route.get('/user', middleware.authenticateToken, function(req,res) {
    return res.send(req.user);
});  

route.post('/token', function(req,res) {
    var refreshToken = req.body.token;
    if(!refreshToken) {
        return res.sendStatus(401);
    }
    jwt.verify(refreshToken,refreshSecret,(err,decode) => {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }else {
            var authData = new AuthData(decode.id,decode.email,decode.nickname,decode.role);
            console.log(authData);
            var accessToken = generateAccessToken(authData);
            return res.send({
                success: true,
                access_token: accessToken
            });
        }
    });
});

route.post('/register', async function (req,res) {
    if (req.body.email === undefined || req.body.password === undefined) {
        return res.send({
            success: false,
            message: "Email or Passwrod cannot empty!"
        });
    }
    var email = req.body.email;
    var password = req.body.password;
    var idRole = 3;
    var user = db.model.User.create({
        email: email,
        password: password,
        id_role: idRole
    });
    if (user) {
        return res.send({
            success: true,
            message: "success create user!"
        });
    }
});

route.get('/users',middleware.authenticateToken, async function(req,res) {
    return res.send(await db.model.User.findAll({
        include: [{
            model: db.model.Role
        }]
    }));
});



module.exports = route;