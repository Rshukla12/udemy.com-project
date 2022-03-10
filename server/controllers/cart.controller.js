const User = require("../models/user.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");
let orderNo = 1;

const addToCart = async (req, res) => {
    try {
        const { course_id, courses } = req.body;
        const user_id = req.user._id;
        let query = course_id;
        query = query || {$each: courses}

        const liked = await User.findByIdAndUpdate(user_id ,{
            $addToSet: {
                cart: query,
            },
        },{
            returnOriginal: false,
        })
        .populate({path: "cart"})
        .select("cart")
        .lean()
        .exec();

        if (!liked) return res.status(500).json({ msg: "something went wrong!!" });
        res.status(201).json(liked);
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
        .populate({path: "cart"})
        .select("cart")
        .lean()
        .exec();

        if (!updatedCart) return res.status(500).json({ msg: "something went wrong!!" });
        
        let total = 0;
        for (const item of updatedCart.cart) {
            if (item.on_discount) total += 399;
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
        .select({path: "cart"})
        .lean()
        .exec();

        if (!cart || cart.length)
            return res.status(404).json({ msg: "cart is emplty" });
        
        let total = 0;
        for (const item of cart.cart) {
            if (item.on_discount) total += 399;
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

        const cart = await User.findById(user_id).populate({
            path: "cart",
        })
        .select({path: "cart"})
        .lean()
        .exec();

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        let total = 0;
        for (const item of cart.cart) {
            if (item.on_discount) total += 399;
            else total += item.price;
        }

        const options = {
            amount: total * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${orderNo++}`,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const orderSucess = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cart = req.user.cart;
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        console.log(cart);

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        
        const updatedCart = await User.findByIdAndUpdate(user_id,{
                $addToSet: { 
                    purchased: {
                        $each: cart 
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
        res.status(201).json({
            cart: updatedCart.cart, 
            total: 0,
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  emptyCart,
  order,
  orderSucess
};
