const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Review = require("./models/review.model");
const Course = require("./models/review.model");

const postRoutes = require('./routes/posts');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart.route');
const wishlistRouter = require('./routes/wishlist.route');
const courseRouter = require('./routes/course.route');
const instructorRouter = require('./routes/instructor.route');
const searchRouter = require('./routes/search.route');
const videoRouter = require('./routes/video.route');

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.use('/cart', cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/course", courseRouter);
app.use("/instructor", instructorRouter);
app.use("/search", searchRouter);
app.use("/video", videoRouter);

const CONNECTION_URL = process.env.MONGO;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);