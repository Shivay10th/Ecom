/** @format */

const Category = require('../models/category');
exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: 'category not found in DB ',
			});
		}
		req.category = category;
		next();
	});
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);

	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: `${err} NOT able to save category in DB`,
			});
		}
		return res.json({ category });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
	Category.find({}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: 'There is no category in DB',
			});
		}
		return res.json(categories);
	});
};

exports.updateCategory = (req, res) => {
	Category.findByIdAndUpdate(
		{ _id: req.category._id },
		{ $set: { name: req.body.name } },
		{ new: true },
		(err, category) => {
			if (err) {
				return res.status(400).json({
					error: "can't update category.",
				});
			}
			return res.json(category);
		}
	);
};

exports.removeCategory = (req, res) => {
	const category = req.category;
	category.remove((err, category) => {
		if (err) {
			return res.status(400).json({
				error: 'Unable to delete this category.',
			});
		}
		return res.json({
			message: ` successfull to delete ${category}`,
		});
	});
};
