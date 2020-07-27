"use strict";
require('dotenv').config();

const fs = require('fs');

module.exports = {

    getPublicKey: function(){
        return fs.readFileSync("public.key");
    },

    getPrivateKey: function() {
        return fs.readFileSync("private.key");
    },

    getAccessTokenSecret: function() {
        return process.env.ACCESS_TOKEN_SECRET;
    },

    getRefreshTokenSecret: function() {
        return process.env.REFRESH_TOKEN_SECRET;
    }
}