const Course = require("../models/course.model");

const getSuggestions = () => {

};

const getCourses = async (req, res) => {
    let { searchQuery, tags, sort, per_page, page_no } = req.query;
    const limit = per_page || 30;
    const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
    sort = sort || "asc";
    try {
        const query = [];
        const title = new RegExp(searchQuery, "i");
        if ( title ) query.push({course_name: title });
        if ( tags ) query.push( { tags:  {$in: tags.split(",") } } );
        
        const result = await Course.find({
                $or: [ ...query, {
                    "instructors": {
                        $elemMatch: { name: title }
                    }
                }],
            })
            .sort({ purchased: sort })
            .skip(skip)
            .limit(Number(limit))
            .populate({
                path: "instructors",
            })
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

module.exports = {
  getCourses,
  getSuggestions,
};
