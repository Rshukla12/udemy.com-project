const User = require("../models/user.model");

const addToWishlist = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user._id;

        const updatedWishlist = await User.findByIdAndUpdate(user_id,{
                $addToSet: {
                    wishlist: course_id,
                },
            },{
                returnOriginal: false,
            })
            .populate({
                path: "wishlist",
            })
            .select("wishlist")
            .lean()
            .exec();

        if (!updatedWishlist)
            return res.status(500).json({ msg: "something went wrong!!" });
        res.status(500).json(updatedWishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user._id;

        const updatedWishlist = await User.findByIdAndUpdate(user_id,{
            $pull: {
                wishlist: course_id,
            },
        },{
            returnOriginal: false,
        })
        .populate({
            path: "wishlist",
        })
        .select("wishlist")
        .lean()
        .exec();

        if (!updatedWishlist)
            return res.status(500).json({ msg: "something went wrong!!" });
        res.status(201).json(updatedWishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const user_id = req.user._id;

        const wishlist = await User.findById(user_id)
        .populate({
            path: "wishlist",
        })
        .select("wishlist")
        .lean()
        .exec();

        if (!wishlist || wishlist.length)
            return res.status(404).json({ msg: "wishlist is emplty" });
        res.status(200).json(wishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const emptyWishlist = async (req, res) => {
    try {
        const { course_id } = req.query;
        const user_id = req.user._id;

        const updatedWishlist = await User.findByIdAndUpdate(user_id,{
            wishlist: [],
        },{
            returnOriginal: false,
        })
        .select("wishlist")
        .lean()
        .exec();

        if (!updatedWishlist)
            return res.status(500).json({ msg: "something went wrong!!" });
        res.status(201).json(updatedWishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  emptyWishlist,
};
