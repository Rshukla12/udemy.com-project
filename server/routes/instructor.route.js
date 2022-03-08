const express = require("express");
const auth = require("../middleware/auth.js");

const instructorController = require("../controllers/instructor.controller");

const router = express.Router();

router.get("/", instructorController.getInstructors);

router.get("/:id", instructorController.getInstructorById);

router.post("/", instructorController.createInstructor);

module.exports = router;