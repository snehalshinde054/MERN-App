
const user = require('../models/User');

const jwt = require('jsonwebtoken');

const asyncHandler = require('../utils/asyncHandler');

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// generate jwt token
const generateToken = (userId) => {
    return jwt.sign(
        { id : userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

//register user
const registerUser = asyncHandler(async (req,res) =>{
    const { name, email, password } = req.body;

    //check if user exist
    const userExist = await User.findOne({ email });
    if(userExist){
        return res.status(400).json({ message : 'User already Exist!' });
    }

    //create user
    const user = await User.create({ name, email, password});

    res.status(201).json({
        success : true,
        data : {
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        },
    });
});

// Login User
const loginUser = asyncHandler(async(req,res)=> {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message : 'Invalid Credentials' });
    }

    //compare password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({ message : 'invalid credentials'});
    }

    res.status(200).json({
        success : true,
        data : {
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        },
    });

});

module.exports = { registerUser, loginUser };

