/** @format */

const { Order, ProductCart } = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate('products.product', 'name price')
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: 'no order found in db',
				});
			}
			req.order = order;
			next();
		});
};

exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body);
	order.save((err, order) => {
		if (err)
			return res.status(400).json({
				error: 'Creating order failed',
			});
		res.json(order);
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.populate('user', 'id name')
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: 'there is problem in getting orders',
				});
			}
			return res.json(order);
		});
};

exports.getOrderStatus = (req, res) => {
	return res.json(Order.schema.path('status'.enumValues));
};

exports.updateStatus = (req, res) => {
	Order.updateMany(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: 'can not update order status',
				});
			}
			return res.json(order);
		},
	);
};
