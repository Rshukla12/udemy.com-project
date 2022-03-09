const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    if ( !req.headers.authorization || !req.headers.authorization.startsWith("Bearer ") )
      return res.status(403).json({msg: "Missing or improper token!"})

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    try {
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, secret);

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
      }
    } catch (err) {
      return res.status(403).json({ msg: "Invalid or expired token!" });
    }

    const user = await User.findById(req.userId);

    if (!user) return res.status(403).json({ msg: "Invalid or expired token" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong!" });
  }
};

module.exports = auth;
