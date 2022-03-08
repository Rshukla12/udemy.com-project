const mongoose = require("mongoose");

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
        default: "https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg" 
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
    description: [{
        type: String, 
        required: true
    }],
    tags: [{
        type: String, 
        required: true
    }],
    purchased: {
        type: Number, 
        default: 0
    },
    wishlisted: {
        type: Number, 
        default: 0
    },
    languages: [{
        type: String,
        required: true
    }],
    level: {
        type: String
    } 
},{
    versionKey: false,
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;