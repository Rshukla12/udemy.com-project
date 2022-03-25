const express = require("express");
const auth = require("../middleware/auth.js");

const instructorController = require("../controllers/instructor.controller");

const router = express.Router();

router.get("/", instructorController.getInstructors);

router.get("/:id", instructorController.getInstructorById);

// router.post("/", instructorController.createInstructor);


router.post("/signin", instructorController.signInByInstructor);
router.post("/signup", instructorController.signUpByInstructor);

module.exports = router;