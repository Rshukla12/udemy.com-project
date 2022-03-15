const express = require("express");
const auth = require("../middleware/auth.js");

const reviewController = require("../controllers/review.controller");

const router = express.Router();

router.get("/user/:id", reviewController.getReviewsByUser);

router.get("/course/:id", reviewController.getReviewsOnCourse);

router.get("/:id", reviewController.getReviewById)

router.post("/course/:id", auth, reviewController.createNewReview);

router.patch("/:id", auth, reviewController.updateReview);

router.delete("/:id", auth, reviewController.deleteReview);

module.exports = router;