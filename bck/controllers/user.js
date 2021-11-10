/** @format */

const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			res.status(400).json({
				error: 'No user was found in DB',
			});
		}
		req.profile = user;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.safe_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		req.profile._id,
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: 'User does not exist',
				});
			}
			user.salt = undefined;
			user.safe_password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;
			return res.json({
				user,
			});
		}
	);
};

exports.userPurchaseList = (req, res) => {
	Order.find({ user: req.user._id })
		.populate('user', '_id name')
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: 'No order in this Account',
				});
			}
			return res.json(order);
		});
};

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];

	req.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});

		User.findOneAndUpdate(
			{ _id: req.profile._id },
			{ $push: { purchases: purchases } },
			{ new: true },
			(err, purchases) => {
				if (err) {
					return res.status(400).json({
						error: 'unable to store purchase list',
					});
				}
			}
		);
	});
	next();
};
