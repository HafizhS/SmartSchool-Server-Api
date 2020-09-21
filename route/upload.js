const express = require('express');
const middlewares = require('../middlewares');
const multer = require('multer');
const route = express.Router();
const fs = require('fs');
const path = require('path');

var memoryUpload = multer({
    storage: multer.memoryStorage()
});

var diskUpload = multer({
    dest: `${__dirname}/../temp`
});

route.post('/upload/avatar',middlewares.authenticateToken,memoryUpload.single('avatar'),function(req,res) {
    var avatar = req.file;
    var dir = `${__dirname}/../storage/user/${req.user.id}`;
    var fileName = `avatar${path.extname(avatar.originalname)}`;
    if(!avatar) {
        return res.sendStatus(401);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFile(`${dir}/${fileName}`,avatar.buffer,(err) => {
        if(err) {
            return res.status(403).send(err)
        }

        return res.status(200).send({
            avatar_url: `${req.baseUrl}/storage/user/${req.user.id}/${fileName}`
        });
    });
});

route.post('/upload/cover',middlewares.authenticateToken,memoryUpload.single('avatar'),function(req,res) {
    var avatar = req.file;
    var dir = `${__dirname}/../storage/user/${req.user.id}`;
    var fileName = `cover${path.extname(avatar.originalname)}`;
    if(!avatar) {
        return res.sendStatus(401);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFile(`${dir}/${fileName}`,avatar.buffer,(err) => {
        if(err) {
            return res.status(403).send(err)
        }

        return res.status(200).send({
            cover_url: `${req.baseUrl}/storage/user/${req.user.id}/${fileName}`
        });
    });
});

module.exports = route;


