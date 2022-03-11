const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Instructor = require("../models/instructor.model");

const deliverVideo = (req, res) => {
    try {
        // const purchased = req.user.purchased;
    
        const range = req.headers.range;
        const id = req.params.id;

        // let isUserAuth = false;
        // for ( const courses of purchased ){
        //     if ( courses._id === id ) isUserAuth = true;
        // } 

        // if ( !isUserAuth ) {
        //     return res.status(403).json({msg: "You are not authorized to view this, please buy the course!"})
        // }
    
        const fileName = `${id}.mp4`;
        const videoPath = path.join(__dirname, "../videos", fileName);
        if ( ! fs.existsSync(videoPath) ) {
            return res.status(404).json({ msg: "File does not exists!" })
        }
        
        if (!range) {
            return res.status(400).json({msg: "Requires Range header"});
        }

        const videoSize = fs.statSync(videoPath).size;
            
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        
        res.writeHead(206, headers);
        
        const videoStream = fs.createReadStream(videoPath, { start, end });
        console.log(videoStream);
        videoStream.pipe(res);
    } catch ( err ) {
        res.status(500).json({msg: "something went wrong!"});
    }
};

const uploadVideo = async ( req, res ) => {
    try {
        if ( !req.file ){
            return res.status(400).json({msg: "file is required to be uploaded", err: err});
        }
        res.status(201).json({msg: "uploaded successfully!"});
    } catch (err) {
        console.log(err);
        if (err instanceof multer.MulterError) 
            return res.status(400).json({msg: "Improper data!", err: err.code});
        res.status(500).json({msg: "something went wrong!",  err: err.code });
    }
};

module.exports = {
    deliverVideo,
    uploadVideo
};