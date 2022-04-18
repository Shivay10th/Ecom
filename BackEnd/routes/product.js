/** @format */
const router = require('express').Router();
const { isAdmin, isAuthenticated, isLoggedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const {
	getProductById,
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	getAllProduct,
	photo,
	getAllUniqueCategories,
} = require('../controllers/product');
const { check, validationResult } = require('express-validator');
const formidable = require('formidable');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.post(
	'/product/create/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	createProduct,
);

router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

router.delete(
	'/product/:productId/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct,
);
router.put(
	'/product/:productId/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	updateProduct,
);

router.get('/products', getAllProduct);

router.get('/products/categories', getAllUniqueCategories);
module.exports = router;
