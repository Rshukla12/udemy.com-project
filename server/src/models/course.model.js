const mongoose = requrie("mongoose");

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String, 
        required: true, 
        unique: true
    },
    tagline: {
        type: String, 
        required: true
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    }],
    img: {
        type: String, 
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: false
    }],
    price: {
        type: Number, 
        required: true
    },
    on_discount: {
        type: Boolean,
        default: false
    },
    course_time: {
        type:  Number, 
        required:  true
    },
    description: {
        type: String, 
        required: true
    },
    topic: {
        type: String, 
        required: true 
    },
    languages: [{
        type: String,
        required: true
    }]
},{
    versionKey: false,
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;