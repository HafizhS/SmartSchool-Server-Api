const jwt = require('jsonwebtoken');

module.exports = {

    authenticateToken: function (req, res, next) {
        var authHeader = req.headers['authorization'];
        var token = authHeader && authHeader.split(' ')[1];
        var publicKey = require('./functions').getPublicKey();

        if (token === null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, publicKey, {algorithms: 'RS256'}, (err, decoded) => {
            if (err) {
                console.log(err);
                console.log(decoded);
                return res.sendStatus(403);
            }
            req.user = decoded;
            next();
        });
    },

    authenticateUser: function(req,req,next) {

    }

};