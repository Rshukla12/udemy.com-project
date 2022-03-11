const Instructor = require("../models/instructor.model");

const isCourseOwner = async (req, res, next) => {
    try {
        const user = req.user;

        // get course id
        const id = req.params.id;

        // check if user is instructor        
        const instructor = await Instructor.findOne({
            user: user._id
        });

        if ( !instructor ) 
            return res.status(403).json({msg: "you are not authorised to do this!"});

        let ownerOfCourse = false;

        // check if instructor is course owner
        for ( const course_id of instructor.courses ){
            if ( course_id == id ) ownerOfCourse = true;
        }

        if ( !ownerOfCourse )
            return res.status(403).json({msg: "you are not authorised to do this!"});
        next();
    } catch ( err ) {
        console.log(err);
        res.status(500).json({msg: "something went wrong!",  err: err.code });
    }
};


module.exports = isCourseOwner;