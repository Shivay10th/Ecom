/** @format */

const router = require('express').Router();

const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
	removeCategory,
} = require('../controllers/category');
const { isAuthenticated, isAdmin, isLoggedIn } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//actual routes

router.post(
	'/category/create/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	createCategory,
);

router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

router.put(
	'/category/:categoryId/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	updateCategory,
);
router.delete(
	'/category/:categoryId/:userId',
	isLoggedIn,
	isAuthenticated,
	isAdmin,
	removeCategory,
);

module.exports = router;
