const User = require("../models/user.model");

const addToCart = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user._id;

        const liked = await User.findByIdAndUpdate(user_id ,{
            $addToSet: {
                cart: course_id,
            },
        },{
            returnOriginal: false,
        })
        .populate("cart")
        .select("cart")
        .lean()
        .exec();

        if (!liked) return res.status(500).json({ msg: "something went wrong!!" });
        res.status(500).json(liked);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user._id;

        const updatedCart = await User.findByIdAndUpdate(user_id,{
            $pull: {
                cart: course_id,
            },
        },{
            returnOriginal: false,
        })
        .populate("cart")
        .select("cart")
        .lean()
        .exec();

        if (!updatedCart) return res.status(500).json({ msg: "something went wrong!!" });
        
        let total = 0;
        for (const item of updatedCart.cart) {
            if (item.on_sale) total += 399;
            else total += item.price;
        }
        res.status(201).json({cart: updatedCart.cart, total });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getCart = async (req, res) => {
    try {
        const user_id = req.user._id;

        const cart = await User.findById(user_id).populate({
            path: "cart",
        })
        .select("cart")
        .lean()
        .exec();

        if (!cart || cart.length)
            return res.status(404).json({ msg: "cart is emplty" });
        
        let total = 0;
        for (const item of cart.cart) {
            if (item.on_sale) total += 399;
            else total += item.price;
        }
        res.status(200).json({ cart: cart.cart, total: total, items: cart.length });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const emptyCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const updatedCart = await User.findByIdAndUpdate(user_id,{
            cart: [],
        },{
            returnOriginal: false,
        })
        .select("cart")
        .lean()
        .exec();

        if (!updatedCart) return res.status(500).json({ msg: "something went wrong!!" });
        res.status(201).json({cart: updatedCart.cart, total: 0});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
}

const order = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cart = req.user.cart;

        let total = 0;
        for (const item of cart) {
            if (item.on_sale) total += 399;
            else total += item.price;
        }

        const updatedCart = await User.findByIdAndUpdate(user_id,{
                purchased: {
                    $push: {
                        cart,
                        time: Date.now().toLocaleString(),
                        total
                    }
                },
                cart: [],
            },{
                returnOriginal: false,
            })
            .select("cart")
            .lean()
            .exec();

        if (!updatedCart) return res.status(500).json({ msg: "something went wrong!!" });
        res.status(201).json({cart: updatedCart.cart, total: 0});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  emptyCart,
  order
};
