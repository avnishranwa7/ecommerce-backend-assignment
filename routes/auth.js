import express from 'express';
import { body } from 'express-validator';

import User from '../models/user.js';
import { signup, login } from '../controllers/auth.js';

const router = express.Router();

router.put('/signup',
    [
        body('email').isEmail().withMessage('Please enter a valid email address')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email already exists.');
                        }
                    })
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 8 }),
        body('name').trim().not().isEmpty()
    ],
    signup
);

router.post('/login', login);

export default router;