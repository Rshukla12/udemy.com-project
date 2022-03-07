const Course = require("../models/course.model");
const User = require("../models/user.model");

const getCourses = async (req, res) => {
    try {
        let { id, sort, limit } = req.query;
        limit = limit || 30;
        sort = sort || "asc";
        // check if asking for specific
        let result;
        if (id) {
            result = await Course.findById(id)
                .populate({
                    path: "instructors",
                    select: "user",
                    populate: {
                        path: "user",
                        select: "name -_id",
                    }
                })
                .populate("reviews")
                .lean()
                .exec();
            if (!result)
                return res.status(404).json({ msg: "course doesn't exist!" });
        } else {
            result = await Course.find()
                .sort({ purchased: sort })
                .limit(limit)
                .populate({
                    path: "instructors",
                    select: "user",
                    populate: {
                        path: "user",
                        select: "name -_id",
                    }
                })
                .populate("reviews")
                .lean()
                .exec();
            if (!result || !result.length)
                return res.status(404).json({ msg: "courses doesn't exist!" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getCourseByTopic = async (req, res) => {
    try {
        let { sort, limit } = req.query;
        limit = limit || 30;
        sort = sort || "asc";
        const topic = req.params.topic;
        const result = await Course.find({ topic: topic })
        .sort({ purchased: sort })
        .limit(limit)
        .populate({
            path: "instructors",
            populate: {
                path: "user",
            },
        })
        .populate("reviews")
        .lean()
        .exec();
        if (!result || !result.length)
            return res.status(404).json({ msg: "courses doesn't exist!" });

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

// input
/**
 * course_name: unique String,
 * tagline: String,
 * instructors: array of instructor_id,
 * img: "url"
 * price: Number
 *on_discount: boolean
 *course_time: time in mins
 *description: array of strings, minimum 3 length,
 * tag: array of string
 * languages: array of string
 */

const createCourse = async (req, res) => {
    try {
        const courseNameExists = await Course.find({
            course_name: req.body.course_name,
        });

        if (courseNameExists)
            return res.status(400).json({ msg: "course name already exists!" });

        const { instructor, ...data } = req.body;
        const course = await Course.create({
            ...req.body,
            instructors: [req.user._id, ...instructor],
        });

        res.status(201).json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

module.exports = {
  getCourses,
  getCourseByTopic,
  createCourse,
};
