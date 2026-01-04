import express from 'express';
import User from '../models/User.js'
import { errorValidate, loginValidation, signupValidation } from '../utils/validators.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();


/**
 * @route   POST /auth/signup
 * @desc    Register a new user
*/
router.post('/signup', signupValidation, errorValidate, async (req, res, next) => {

    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User with this email already exists"
            })
        }

        // Create user (password will be hashed by pre-save middleware)
        const user = await User.create({
            username,
            email,
            password
        })

        // Generate JWT token
        const token = generateToken(user._id)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            }
        });

    } catch (error) {
        next(error)
    }
})


/**
 * @route   POST /auth/login
 * @desc    Authenticate user and get token
*/
router.post('/login', loginValidation, errorValidate, async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // Find user by email and explicitly select password field
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = generateToken(user._id)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            }
        });

    } catch (error) {
        next(error);
    }

})

export default router;