const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");
const isCourseOwner = require("../middleware/isCourseOwner.middleware.js");

const videoUpload = require("../config/videoUpload.config");

const videoController = require("../controllers/video.controller");

router.get("/watch/:id", videoController.deliverVideo);

router.get("/:id", auth, videoController.generateUrl);

router.post("/:id", auth, isCourseOwner, videoUpload.single('file'), videoController.uploadVideo);

module.exports = router;