const Instructor = require("../models/instructor.model");
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

const createInstructor = async (req, res) => {
    try {
        let user = req.user;
        const { info } = req.body;
        if (!user) user = await user.create({ email, password, name: `${fullName}` });
        else {
            const isAlreadyInstructor = await Instructor.findOne({user: user._id});
            
            if ( isAlreadyInstructor ) return res.status(400).json({msg: "Already instructor!"});
        }

        const result = await Instructor.create({info, name: user.name, courses: [], user: user});
        
        const token = jwt.sign( { id: result._id }, secret, { expiresIn: "1h" });
        
        res.status(201).json({token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

module.exports = {
    getInstructors,
    getInstructorById,
    createInstructor
};
