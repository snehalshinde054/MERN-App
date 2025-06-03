const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { body } = require('express-validator'); 
const { protect } = require('../middlewares/authMiddleware');

//Register
router.post('/register',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min : 6 }).withMessage('Password must be at least 6 characters'),
],registerUser);

// Login 
router.post('/login',[
    body('email').isEmail().withMessage('Valid Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
],loginUser);

// Get Logged In user Info
router.get('/me',protect, getMe);

module.exports = router;