const jwt = require('jsonwebtoken');
const AuthData = require('./models/auth/authData');

module.exports = {

    authenticateToken: function (req, res, next) {
        var authHeader = req.headers['authorization'];
        var token = authHeader && authHeader.split(' ')[1];
        var publicKey = require('./functions').getPublicKey();
        var accessSecret = require('./functions').getAccessTokenSecret();

        if (token !== null) {
            console.log(token);
            // return res.sendStatus(401);
        }

        jwt.verify(token, accessSecret, (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    console.log('Token Expired');
                }
                console.log(err);
                return res.sendStatus(401);
            }
            var user = new AuthData(decoded.id,decoded.email,decoded.nickname,decoded.role);
            console.log(user);
            req.user = user;
            next();
        });
    },

    checkRole: function (req,res,next) {
        if (req.user.role.role === 'guest') {
            return res.send({
                success: false,
                message: "you dont have permission!"
            });
        }

        next();
    }
};