const express = require("express");
const auth = require("../middleware/auth.js");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", auth, cartController.getCart);

router.patch("/add", auth, cartController.addToCart);

router.patch("/remove", auth, cartController.removeFromCart);

router.delete("/", auth, cartController.emptyCart);

router.post("/order", auth, cartController.order);

module.exports = router;