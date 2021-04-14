/** @format */

const express = require('express');
const router = express();
const { logOut, signUp, signIn, isLoggedIn } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');

router.post(
	'/signup',
	[
		check('name')
			.isLength({ min: 3 })
			.withMessage('must be at least 3 chars long'),
		check('email').isEmail().withMessage('Invalid Email'),
		check('password')
			.isLength({ min: 5 })
			.withMessage('password must be at least 5 chars long'),
	],
	signUp
);
router.post(
	'/signin',
	[
		check('email').isEmail().withMessage('Invalid Email'),
		check('password').isLength({ min: 1 }).withMessage('password is required'),
	],
	signIn
);

router.get('/logout', logOut);

module.exports = router;
