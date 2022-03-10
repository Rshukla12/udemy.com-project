const Course = require("../models/course.model");

const getSuggestions = () => {

};

// const getCourses = async (req, res) => {
//     let { searchQuery, tags, sort, order_by, per_page, page_no } = req.query;
//     const limit = per_page || 30;
//     const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
//     sort = sort || "views";
//     try {
//         const query = [];
//         const title = searchQuery !== "none" ? new RegExp(searchQuery, "i") : "";
//         if ( title ) query.push({course_name: title });
//         // if ( tags ) query.push( { tags:  {$in: tags.split(",%20") } } );
        
//         const result = await Course.find({title
//                 // $or: [ ...query, {
//                 //     "instructors": {
//                 //         $elemMatch: { creator: title }
//                 //     }
//                 // }],

                
//             })
//             // .sort(`-${sort}`)
//             .skip(skip)
//             .limit(Number(limit))
//             .populate({
//                 path: "instructors",
//             })
//             .lean()
//             .exec();
//         console.log(result)
//         if (!result || !result.length)
//             return res.status(404).json({ msg: "courses doesn't exist!" });
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "something went wrong!" });
//     }
// };



const getCourses = async (req, res) => {
    let { searchQuery,sort, per_page, page_no } = req.query;
    const limit = per_page || 30;
    const skip = page_no ? page_no > 1 ? ( page_no - 1 ) * per_page : 0 : 0;
    sort = sort || "views";
    try {
        
        const title = new RegExp(searchQuery, "i");

        const posts = await Course.find({ course_name:title }).sort(`${sort}`).skip(skip).limit(Number(limit));
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
  getCourses,
  getSuggestions,
};
