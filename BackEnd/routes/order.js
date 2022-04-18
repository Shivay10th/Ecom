/** @format */

const router = require('express').Router();
const { isAdmin, isAuthenticated, isLoggedIn } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock } = require('../controllers/product');

const {
	getOrderById,
	createOrder,
	getAllOrders,
	updateStatus,
	getOrderStatus,
} = require('../controllers/order');

router.param('userId', getUserById);
router.param('orderId', getOrderById);

router.post(
	'order/create/:userId',
	isLoggedIn,
	isAuthenticated,
	pushOrderInPurchaseList,
	updateStock,
	createOrder,
);

router.get(
	'/order/all/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	getAllOrders,
);

router.get(
	'/order/status/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	getOrderStatus,
);
router.put(
	'/order/:orderId/status/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	updateStatus,
);
module.exports = router;
