/** @format */

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 32,
			required: true,
		},
		description: {
			type: String,
			maxlength: 2000,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
			required: true,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		stock: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);
