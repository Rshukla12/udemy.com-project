import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await oldUser.comparePassword(password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser)
            return res.status(400).json({ message: "User already exists" });

        const result = await User.create({ email, password, name: `${fullName}` });

        const token = jwt.sign({ id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
  signin,
  signup,
};
