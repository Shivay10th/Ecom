/** @format */

const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const { request } = require('../routes/auth');
exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: 'product is not here',
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	// console.log(req.body)
	//TODO: add validation
	const form = formidable({
		keepExtentions: true,
	});
;	// console.log(req.body) req.body is empty
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).jsonp({
				error: 'there is something wrong with file',
			});
		}
		// console.log(fields) return fields
		const product = new Product(fields);

		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'file is to Big',
				});
			}
			console.log(file.photo.path)
			product.photo.data = fs.readFileSync(file.photo.path);
			// console.log(file.photo.type);   image/png
			console.log(file.photo.data);
			
			product.photo.contentType = file.photo.type;
		}

		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: 'saving tshirt in db failed' + err,
				});
			}
			console.log(product._id)
			res.json(product);
		});
	});
};
exports.getProduct = (req,res)=>{
	console.log(req.product)
	req.product.photo = undefined;
	return res.json(req.product)
}
//midlewear
exports.photo = (req,res)=>{
	if(req.product.photo.data){
		console.log(req.product.photo)
		console.log(req.product.photo.contentType);
		// u have to set content type (it will be set as image/png or depend on file)
		res.set('Content-Type',req.product.photo.contentType);
		return res.send(req.product.photo.data)
	}
	next()
}

exports.deleteProduct = (req,res)=>{
	let product = req.product;
	product.remove((err,deletedProduct)=>{
		if(err){
			res.status(400).json({
				error:"failed to delete"
			})
		}
		res.json({
			msg:"successfully deleted"
		})
	})
}

exports.updateProduct = (req,res)=>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
	return res.status(422).json({
		error: errors.array(),
	});
}
const form = formidable({
	keepExtentions: true,
});
// console.log(req.body) req.body is empty
form.parse(req, (err, fields, file) => {
	if (err) {
		return res.status(400).json({
			error: 'there is something wrong with file',
		});
	}
	// console.log(fields) return fields
	const product = new Product(fields);

	if (file.photo) {
		if (file.photo.size > 3000000) {
			return res.status(400).json({
				error: 'file is to Big',
			});
		}
		console.log(file.photo.path);
		product.photo.data = fs.readFileSync(file.photo.path);
		// console.log(file.photo.type);   image/png
		console.log(file.photo.data);

		product.photo.contentType = file.photo.type;
	}

	product.save((err, product) => {
		if (err) {
			return res.status(400).json({
				error: 'saving tshirt in db failed' + err,
			});
		}
		console.log(product._id);
		res.json(product);
	});
});
}

exports.getAllProduct = (req,res)=>{
	const limit = req.query.limit ?parseInt( req.query.limit ): 8;
	const sortBy = req.query.sortby? req.query.sortby : "_id";
	Product.find()
		.select('-photo')
		.populate('category')
		.sort(sortBy)
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: 'no product found',
				});
			}
			res.json(products);
		});
}