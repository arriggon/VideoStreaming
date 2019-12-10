const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
    origin: '*'
};

function getDate() {
    const today = new Date();
    let yy = today.getFullYear();
    let dd = today.getDate();
    let mm = today.getMonth();
    let hh = today.getHours();
    let MM = today.getMinutes();
    let ss = today.getSeconds();

    if(dd < 10) {
        dd = '0' + dd;
    }

    if(mm < 10) {
        mm = '0' + mm;
    }

    if(hh < 10) {
        hh = '0' + hh;
    }

    if(MM < 10) {
        MM = '0' + MM;
    }

    if(ss < 10) {
        ss = '0' + ss;
    }

    return `${dd}/${mm}/${yy} ${hh}:${MM}:${ss}`;
}

app.get('/videos', cors(corsOptions), (req, res) => {
    console.info(`[${getDate()}]: Received request for videos`);

    const dirPath = path.join(__dirname, 'assets');

    const dirs = fs.readdirSync(dirPath, {withFileTypes: true});

    const f = dirs.filter(dirent => dirent.name.includes('.mp4')).map(dir => dir.name);

    res.json({files: f});
});

app.get('/video/:videoname', cors(corsOptions), (req, res) => {
    console.info(`[${getDate()}]: Received request for video ${req.params.videoname}`);


    const filePath = path.join(__dirname, 'assets', req.params.videoname + '.mp4');
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end-start)+1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': `bytes`,
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});