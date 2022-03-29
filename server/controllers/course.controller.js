const Course = require("../models/course.model");
const Instructor = require("../models/instructor.model");

const client = require("../config/redis.config");

const getCourses = async (req, res) => {
    try {
        let { sort, per_page, page } = req.query;
        const limit = per_page || 6;
        // const skip = page ? page > 1 ? ( page - 1 ) * per_page : 0 : 0;
        const startIndex = (Number(page) - 1) * limit; // get the starting index of every page

        sort = sort || "asc";
        
        const key = `courses.${limit}.${startIndex}`;

        let result = await client.get(key);
        if ( result ){
            result = JSON.parse(result);
            return res.status(200).json(result);
        }

        const total = await Course.countDocuments({});

        result = await Course.find({})
            .sort({ purchased: sort })
            .skip(startIndex)
            .limit(Number(limit))
            .populate({
                path: "instructors",
                select: "creator"
            })
            .lean()
            .exec();
        if (!result || !result.length)
            return res.status(404).json({ msg: "courses doesn't exist!" });
        await client.set(key, JSON.stringify({data: result, currentPage: Number(page) || 1, numberOfPages: Math.ceil(total / limit)}));
        res.status(200).json({data: result, currentPage: Number(page) || 1, numberOfPages: Math.ceil(total / limit)});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;

        let result = await client.get(`course.id.${id}`);
        
        if ( result ) {
            result = JSON.parse(result);
            return res.status(200).json(result);    
        }

        result = await Course.findById(id)
            .populate([{
                path: "instructors",
                select: "creator"
            },{
                path: "reviews",
                populate: {
                    path: "author",
                    select: "name"
                }
            }])
            .lean()
            .exec();
        if (!result)
            return res.status(404).json({ msg: "course doesn't exist!" }); 
        
        client.set(`course.id.${id}`, JSON.stringify(result));
        
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getCourseByTag = async (req, res) => {
    
    try {
        let { sort, per_page, page_no } = req.query;
        const limit = per_page || 30;
        const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
        sort = sort || "asc";
        
        const tag = req.params.tagName?.toLowerCase();
        
        let result = await client.get(`course.tag.${tag}`);
        
        if ( result ){
            result = JSON.parse(result);
            return res.status(200).json(result);        
        }

        result = await Course.find({ tags: {$in: [ tag ]} })
            .sort({ purchased: sort })
            .limit(Number(limit))
            .skip(skip)
            .populate([{
                path: "instructors",
                select: "creator",
            }, {
                path: "reviews"
            }])
            .lean()
            .exec();
        if (!result || !result.length)
            return res.status(404).json({ msg: "courses doesn't exist!" });

        await client.set(`course.tag.${tag}`, JSON.stringify(result));
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
        const user = req.user;
        
        const isUserInstructor = await Instructor.findOne({
            user: user._id
        });

        if ( !isUserInstructor ) return res.status(403).json({msg: "you are not authorised to do this!"})

        const courseNameExists = await Course.findOne({
            course_name: req.body.course_name,
        });

        if (courseNameExists)
            return res.status(400).json({ msg: "course name already exists!" });

        let { instructor, ...data } = req.body;

        instructor = instructor ?? []; 

        const course = await Course.create({
            ...data,
            instructors: [isUserInstructor._id, ...instructor],
        });

        for ( const userId of [isUserInstructor._id, ...instructor] ){
            await Instructor.findByIdAndUpdate(userId, {
                $addToSet: {
                    courses: course._id,
                }
            });
        }

        client.flushAll();

        res.status(201).json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getCourseByInstructor = async (req, res) => {
    try {
        let { sort, per_page, page_no } = req.query;
        const limit = per_page || 30;
        const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
        sort = sort || "asc";

        const instructor = req.params.instructor;
        
        const instructorData = await Instructor.findById(instructor)
            .populate({
                path: "courses"
            })
            .sort({ purchased: sort })
            .limit(Number(limit))
            .skip(skip)
            .lean()
            .exec();
        if ( !instructorData ) return res.status(404).json({msg: "no such instructor exists!"})
        
        res.status(201).json(instructorData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getMyCourses = async ( req, res ) =>  {
    try {
        const user_id = req.user._id;
        console.log(user_id);
        const courses = await Instructor.findOne({user: user_id}).populate({
            path: "courses",
        })
        .select({path: "courses"})
        .lean()
        .exec();
    
        if ( !courses )
            return res.status(404).json({ msg: "courses is empty" });
        
        res.status(200).json({ courses: courses.courses, items: courses.length });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong!" });
    };
}   
    

module.exports = {
  getCourses,
  getCourseByTag,
  createCourse,
  getCourseById,
  getCourseByInstructor,
  getMyCourses
};
