
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
    const { name, email, password, role } = req.body;

    //check if user exist
    const userExist = await User.findOne({ email });
    if(userExist){
        return res.status(400).json({ message : 'User already Exist!' });
    }
    if (!email || !password) {
             res.status(400);
             throw new Error("All fields are required");
    }

    //create user
    const user = await User.create({ name, email, password, role});

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
        return res.status(401).json({ message : 'Invalid Credentials'});
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

// get logged user details
const getMe =  asyncHandler (async ( req, res ) =>{

    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if(!user){
        return res.status(404).json({ message : 'User Not Found'});
    }
    res.status(200).json({
        success : true,
        data : user
    });
});

module.exports = { registerUser, loginUser, getMe };

