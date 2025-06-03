// models/User.js

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
   role : {
        type : String,
        enum : ['user','admin'],
        default : 'user',
    }
   }, {
    timestamps : true
    });

// hash password before saving user
UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next(); // skip if password not modifies 

    this.password = await bcrypt.hash(this.password,10);
    next(); //proceed to save
});

// match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model('User',UserSchema) ;