"use strict";
require('dotenv').config();
const fs = require('fs');

module.exports = {

    getPublicKey: function () {
        return fs.readFileSync("public.key");
    },

    getPrivateKey: function () {
        return fs.readFileSync("private.key");
    },

    getAccessTokenSecret: function () {
        return process.env.ACCESS_TOKEN_SECRET;
    },

    getRefreshTokenSecret: function () {
        return process.env.REFRESH_TOKEN_SECRET;
    },

    isDirExist(dir) {
        var dir = `${__dirname}/${dir}`;
        return fs.existsSync(dir);
    },

    isDirExistOrCreate(dir) {
        return function() {
            // var dir = __dirname + '/' + dir;
            fs.mkdir("as",(err)=> {
                console.log(err);
            });
            // if (!fs.existsSync(dir)) {
            //     console.log(dir);
            //     fs.mkdirSync('test');
            //     return dir;
            // }
            return dir;
        }
    },

    cleanProperty(obj) {
        for (var propName in obj) { 
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          }
        }
    }
}