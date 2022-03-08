const express = require("express");
const auth = require("../middleware/auth.js");

const wishlistController = require("../controllers/wishlist.controller");

const router = express.Router();

router.get("/", auth, wishlistController.getWishlist);

router.patch("/add", auth, wishlistController.addToWishlist);

router.patch("/remove", auth, wishlistController.removeFromWishlist);

router.delete("/", auth, wishlistController.emptyWishlist);

module.exports = router;