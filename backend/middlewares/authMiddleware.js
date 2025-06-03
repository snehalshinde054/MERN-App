const jwt = require('jsonwebtoken');

const User = require('../models/User');

const protect = async (req,res,next) =>{
    let token;
    
    // check token in authorization header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
           
            token = req.headers.authorization.split(' ')[1]; //Extract Token

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user(without password) to request 
            req.user = await User.findById(decoded.id).select('-password');
            return next(); //continue
        }
        catch(error){
            return res.status(401).json({ message: 'Not Authorized, toekn failed'});
        }
    }
    if(!token){
        return res.status(401).json({ message : 'Not Authorized, no token'});
    }
};

// Restrict to certain roles
const authorize = (...roles) => {
       return (req, res, next) => {
         if(!roles.includes(req.user.role)){
            return res.status(403).json({ message : 'Access Denied : insufficient permission'})
         }
         next();
       };
};

module.exports = { protect, authorize };

