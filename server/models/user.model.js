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
        ref: "course",
        required: false
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: false
    }],
    purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: false
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        required: false
    }],
    isGoogle: {
        type: Boolean
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