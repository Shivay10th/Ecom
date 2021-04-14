/** @format */

const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 32,
		},
		lastname: {
			type: String,
			trim: true,
			maxlength: 32,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		safe_password: {
			type: String,
			required: true,
		},
		salt: String,
		role: {
			type: Number,
			default: 0,
		},
		purchases: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

userSchema
	.virtual('password')
	.get(function () {
		return this._password;
	})
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.safe_password = this.securePassword(password);
	});

userSchema.methods = {
	authenticate: function (password) {
		return this.securePassword(password) === this.safe_password;
	},
	securePassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha256', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	},
};
// console.log(userSchema.path)

module.exports = mongoose.model('User', userSchema);
