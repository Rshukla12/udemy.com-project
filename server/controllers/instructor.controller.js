const Instructor = require("../models/instructor.model");

const getInstructors = async (req, res) => {
    try {
        let { id, sort, limit } = req.query;
        limit = limit || 30;
        sort = sort || "asc";
        // check if asking for specific
        let result;
        if (id) {
            result = await Instructor.findById(id)
                .populate({
                path: "user",
                })
                .populate("users")
                .lean()
                .exec();
            if (!result)
                return res.status(404).json({ msg: "No such Instructor exist!" });
        } else {
            result = await Instructor.find()
                .sort({ purchased: sort })
                .limit(limit)
                .populate({
                path: "user",
                })
                .populate("reviews")
                .select("-user.password")
                .lean()
                .exec();
            if (!result || !result.length)
                return res.status(404).json({ msg: "instructor doesn't exist!" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const createInstructor = async (req, res) => {

};

module.exports = {
    getInstructors,
    createInstructor
}
