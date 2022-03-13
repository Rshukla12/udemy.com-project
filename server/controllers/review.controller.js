const Review = require("../models/review.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

// get a specifc review
const getReviewById = async ( req, res ) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id)
            .populate([{
                path: "course",
            }, {
                path: "author",
                select: "name"
            }])
            .lean()
            .exec();
        if ( !review ) 
            return res.status(404).json({msg: "Invalid or review not found!"});
        return res.status(200).json(review);
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};


// get course reviews
const getReviewsOnCourse = async ( req, res ) => {
    try {
        const id = req.params.id;
        const reviews = await Review.find({course: id})
            .populate({
                path: "author",
                select: "name"
            })
            .lean()
            .exec();

        if ( !reviews.length ) 
            return res.status(404).json({msg: "No reviews present!"});
        return res.status(200).json({data: reviews, total: reviews.len }) 
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};


// get user's reviews
const getReviewsByUser = async ( req, res ) => {
    try {
        const id = req.params.id;
        const reviews = await Review.find({ author: id }).lean().exec();
        if ( !reviews.length ) 
            return res.status(404).json({msg: "No reviews present!"});
        return res.status(200).json({data: reviews, total: reviews.len }) 
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

// submit new review
const createNewReview = async ( req, res ) => {
    try {
        const id = req.params.id;
        const purchased = req.user.purchased;
        const reviews = req.user.reviews; 
        const { review: reviewText, rating } = req.body;

        const num = Number(rating);

        if ( Number.isNaN(num) || num < 1 || num > 5 ) {
            return res.status(400).json({msg: "Invalid Input, rating needs to be number in range 1 to 5 both inclusive"});
        }

        const isValidCourse = await Course.findById(id).lean().exec();
        
        if ( !isValidCourse ) 
            return res.status(404).json({msg: "Invalid course id, course not found!"});

        let isPurchased = false;
        for ( const item of purchased ) {
            if ( item == id ) {
                isPurchased = true;
                break;
            }
        }

        if ( !isPurchased ) {
            return res.status(403).json({msg: "You don't have permission to do this!, please buy the course first!"})
        }

        let isReviewed = await Review.findOne({ author: req.user._id, course: id }).lean().exec();

        if ( isReviewed ) {
            return res.status(403).json({msg: "You can not review same course twice!"})
        }

        const review = await Review.create({ author: req.user._id, rating: num, review: reviewText, course: id});
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { reviews: review._id} }).lean().exec();
        await Course.findByIdAndUpdate(req.params.id, { $addToSet: { reviews: review._id} }).lean().exec();

        if ( !review ) 
            return res.status(500).json({msg: "something went wrong while writing review!"});
        return res.status(200).json(review);
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

// update reviews
const updateReview = async ( req, res ) => {
    try {
        const id = req.params.id;
        const reviews = req.user.reviews;

        const { rating } = req.body;

        const num = Number(rating);

        if ( Number.isNaN(num) || num < 1 || num > 5 ) {
            return res.status(400).json({msg: "Invalid Input, rating needs to be number in range 1 to 5 both inclusive"});
        }

        const isValidReview = await Review.findById(id).lean().exec();
        
        if ( !isValidReview ) 
            return res.status(404).json({msg: "Invalid Review id, Review not found!"})

        let isReviewed = false;
        for ( const item of reviews ) {
            if ( item == id ) {
                isReviewed = true;
                break;
            }
        }

        if ( !isReviewed ) {
            return res.status(403).json({msg: "You don't have permission to do this!"})
        }

        const review = await Review.findByIdAndUpdate( id, {
                ...req.body
            },{
                returnOriginal: false
            }).lean().exec();

        return res.status(200).json(review);
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};



// delete reviews
const deleteReview = async ( req, res ) => {
    try {
        const id = req.params.id;
        const reviews = req.user.reviews;

        const isValidReview = await Review.findById(id).lean().exec();
        
        if ( !isValidReview ) 
            return res.status(404).json({msg: "Invalid Review id, Review not found!"})

        let isReviewed = false;
        for ( const item of reviews ) {
            if ( item == id ) {
                isReviewed = true;
                break;
            }
        }

        if ( !isReviewed ) {
            return res.status(403).json({msg: "You don't have permission to do this!"})
        }

        await Review.findByIdAndDelete(id).lean().exec();        
        await User.findByIdAndUpdate(req.user._id, { $pull: { reviews: id} }).lean().exec();
        await Course.findByIdAndUpdate(req.params.id, { $pull: { reviews: id} }).lean().exec();

        return res.status(201).json({msg: "deleted successfully!"});
    } catch ( err ) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getReviewById,
    getReviewsByUser,
    getReviewsOnCourse,
    updateReview,
    deleteReview,
    createNewReview
};