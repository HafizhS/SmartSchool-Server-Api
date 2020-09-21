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

    isDirExistOrCreate(dir) {
        return function(req,res,next) {
            var fs = require('fs');
            var dir = __dirname+'/'+dir;
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            next();
        };
    },

    isUserDirExistOrCreate(id) {
        return function(req,res,next) {
            var fs = require('fs');
            var dir = __dirname+'/public/user/'+id;
            console.log(dir);
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            next();
        };
    },

    checkRole: function (req,res,next) {
        if (req.user.role.role === 'guest') {
            return res.send({
                success: false,
                message: "you dont have permission!"
            });
        }

        next();
    },
    
    
    requiredFields: function(fields = []) {
        return function(req,res,next) {
            for(var i = 0; i < fields.length; i++) {
                if(req.body[fields[i]] === undefined || req.body[fields[i]].length === 0) {
                    return res.sendStatus(400);
                }else if (i + 1 === fields.length){
                    next();
                    break;
                }
            }
        };
    }
};