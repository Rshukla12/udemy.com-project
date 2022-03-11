const Instructor = require("../models/instructor.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const getInstructors = async (req, res) => {
    try {
        let { sort, per_page, page_no } = req.query;
        const limit = per_page || 30;
        const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
        sort = sort || "asc";

        // check if asking for specific
        let result = await Instructor.find()
            .sort({ purchased: sort })
            .limit(Number(limit))
            .populate({
                path: "courses"
            })
            .lean()
            .exec();
        if (!result || !result.length)
            return res.status(404).json({ msg: "No Instructor were found!" });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getInstructorById = async (req, res) => {
    try {
        let { sort, limit } = req.query;
        limit = limit || 30;
        sort = sort || "asc";
        const id =  req.params.id;
        // check if asking for specific
        let result = await Instructor.findById(id)
            .populate({
                path: "courses",
            })
            .lean()
            .exec();
        if (!result)
            return res.status(404).json({ msg: "No such Instructor exist!" });
    
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const signUpByInstructor = async (req, res) => {
    try {
        let user = req.user;
        let { info,isInstructor, email, fullName, password } = req.body;
        info = info || "Good in Speaking, Learning and Teaching"
        if (!user) user = await User.create({ email, password, name: `${fullName}` });
        else {
            const isAlreadyInstructor = await Instructor.findOne({user: user._id});
            
            if ( isAlreadyInstructor ) return res.status(400).json({msg: "Already instructor!"});
        }

        const result = await Instructor.create({info,isInstructor, creator: user.name, courses: [], user: user});
        
        const token = jwt.sign( { id: user._id }, secret, { expiresIn: "1h" });
        
        res.status(201).json({result,token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};




const signInByInstructor = async (req, res) => {
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


module.exports = {
    getInstructors,
    getInstructorById,
    signInByInstructor,
    signUpByInstructor
};
