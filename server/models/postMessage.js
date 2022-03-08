const mongoose =  require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    rating:Number,
    total_hrs:Number,
    total_lecture:Number,
    level:String,
    course_cost:Number,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;