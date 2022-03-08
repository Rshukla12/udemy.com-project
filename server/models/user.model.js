const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false
    }],
    purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: false
    }],
    isGoogle: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
});

userSchema.pre('save', function(next) {
    if ( !this.isModified('password') ) next();
    this.password =  bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;