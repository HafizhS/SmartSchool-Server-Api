const express = require('express');
const db = require('../config/database');
const middleware = require('../middlewares');
const functions = require('../functions');
const route = express.Router();
const multer = require('multer');
const {
    exec
} = require('child_process');
const fs = require('fs');
const path = require('path');

var storage = multer.memoryStorage();
var upload = multer({
    storage: storage
});

route.post('/tutorial/upload', upload.fields([{
    name: 'video',
    maxCount: 1
}]), async function (req, res) {
    console.log(req.body);
    // Required
    var title = req.body.title;
    var videoFile = req.files.video[0];

    // console.log(req.files);
    // Optional
    var description = req.body.description;
    var subtitleFile = req.body.subtitle;
    var customThumbnail = req.body.custom_thumbnail;

    var dir = `${__dirname}/../storage/tutorial`;

    var videoName = "video-" + Date.now() + path.extname(videoFile.originalname);
    var videoBuffer = videoFile.buffer;
    var videoDir;
    var tutorialId;

    db.models.Tutorial.create({
        title: title,
        description: description
    }).then(data => {

        videoDir = `${dir}/${data.id}`;
        fs.mkdirSync(videoDir);
        fs.writeFileSync(`${videoDir}/${videoName}`, videoBuffer);

        if (!customThumbnail) {
            var thumbnail = "thumbnail.jpeg";
            exec(`ffmpeg -i "${videoName}" -ss 00:00:00.000 -vframes 1 "${thumbnail}"`, {
                cwd: videoDir
            }, (error, stdout, stderr) => {
                console.log({
                    error: error,
                    std: stdout,
                    stderr: stderr
                });
            });
        }
        // fs.writeFileSync()

        db.models.Tutorial.update({
            video: videoName,
            thumbnail: thumbnail
        }, {
            where: {
                id: data.id
            },
        }).then(data => {
            return res.status(202).send(data);
        });
    }).catch(error => {
        console.log(error);
        if (fs.existsSync(videoDir)) {
            fs.rmdirSync(videoDir);
        }
        return res.sendStatus(400);
    });



});

route.get('/tutorial/:id(\\d+)', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    db.models.Tutorial.findOne({
        where: {
            id: req.params.id
        },
    }).then(data => {
        var respone = {
            id: data.id,
            title: data.title,
            description: data.description | null,
            thumbnail: `${fullUrl}/thumbnail`,
            stream_url: `${fullUrl}/stream`
        };
        return res.status(200).send(respone);
    });
});

route.get('/tutorials', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.replace('s','');
    console.log(fullUrl);
    db.models.Tutorial.findAll().then(data => {
        var respone = data.map(value => {
            return {
                id: value.id,
                title: value.title,
                description: value.description | null,
                thumbnail: `${fullUrl}/${value.id}/thumbnail`,
                stream_url: `${fullUrl}/${value.id}/stream`
            }
        });
        return res.status(200).send(respone);
    });
});

route.get('/tutorial/:id(\\d+)/thumbnail', function (req, res) {
    db.models.Tutorial.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        var pathFile = `${__dirname}/../storage/tutorial/${data.id}/${data.thumbnail}`;
        var stat = fs.statSync(pathFile);
        var extname = path.extname(pathFile).replace('.','');
        var fileSize = stat.size;
        var range = req.header.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ?
                parseInt(parts[1], 10) :
                fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(pathFile, {
                start,
                end
            })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': `image/${extname}`,
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': `image/${extname}`,
            }
            res.writeHead(200, head)
            fs.createReadStream(pathFile).pipe(res)
        }
    }).catch(error => {
        console.error(error);
        return res.sendStatus(400);
    });
});

route.get('/tutorial/:id(\\d+)/stream', function (req, res) {
    db.models.Tutorial.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        var pathFile = `${__dirname}/../storage/tutorial/${data.id}/${data.video}`;
        var stat = fs.statSync(pathFile);
        var extname = path.extname(pathFile).replace('.','');
        var fileSize = stat.size;
        var range = req.header.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ?
                parseInt(parts[1], 10) :
                fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(pathFile, {
                start,
                end
            })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': `video/${extname}`,
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': `video/${extname}`,
            }
            res.writeHead(200, head)
            fs.createReadStream(pathFile).pipe(res)
        }
    }).catch(error => {
        console.error(error);
        return res.sendStatus(400);
    });
});

module.exports = route;