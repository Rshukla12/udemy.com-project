const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connect = require("./config/db.config");
const client = require("./config/redis.config");

const Review = require("./models/review.model");
const Course = require("./models/review.model");

const PORT =  process.env.PORT || 5000;

const postRoutes = require('./routes/posts');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart.route');
const wishlistRouter = require('./routes/wishlist.route');
const courseRouter = require('./routes/course.route');
const instructorRouter = require('./routes/instructor.route');
const searchRouter = require('./routes/search.route');
const reviewRouter = require('./routes/review.route');
const videoRouter = require('./routes/video.route');

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.use('/cart', cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/course", courseRouter);
app.use("/instructor", instructorRouter);
app.use("/search", searchRouter);
app.use("/review", reviewRouter);
app.use("/video", videoRouter);

const start = async () => {
  try {
    await connect();
    await client.connect();
    app.listen(PORT, () => {
      console.log("server is running on :" , PORT)
    })
  } catch (err) {
    console.log(err);
  }
};

start();