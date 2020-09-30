/** @format */

User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { check, validationResult } = require('express-validator');

exports.signUp = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			res.status(400).json({
				err: 'data is not saved in DB',
			});
		}
		console.log(({ name } = user));
		res.json({ name: user.name, email: user.email });
	});
};
exports.signIn = (req, res) => {
	const errors = validationResult(req);
	const { email, password } = req.body;
	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: 'Email does not exist.',
			});
		}
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: 'Wrong Password.',
			});
		}
		//token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		//puting token in cookie
		res.cookie('token', token, { expire: new Date() + 999 });
		//response to frontend
		const { _id, email, name, role } = user;
		return res.json({
			token,
			user: {
				_id,
				name,
				email,
				role,
			},
		});
	});
};
exports.logOut = (req, res) => {
	res.json({
		message: 'Logged out',
	});
};
