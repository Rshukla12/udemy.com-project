const multer = require("multer");
const path = require("path");


const fileFilter = (req, file, cb) => {
    if ( file.mimetype == "video/mp4" || file.mimetype == "video/webm" ) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("INVALID_TYPE"))
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../", "videos"));
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + path.extname(file.originalname) );
    },
});

const videoUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 200,
    },
    fileFilter: fileFilter
});

module.exports = videoUpload;