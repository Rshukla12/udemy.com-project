const express = require("express");
const auth = require("../middleware/auth.js");

const courseController = require("../controllers/course.controller");

const router = express.Router();

router.get("/", courseController.getCourses);

router.get("/tag/:tagName", courseController.getCourseByTag);

router.get("/instructor/:instructor", courseController.getCourseByInstructor);

router.get("/:id", courseController.getCourseById);

router.post("/", auth, courseController.createCourse);

// router.patch("/remove", auth, courseController.removeCourse);

module.exports = router;