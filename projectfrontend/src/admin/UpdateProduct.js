/** @format */

import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {
	getAProduct,
	getCategories,
	updateAProduct,
} from './helper/adminapicall';

const UpdateProduct = ({ match }) => {
	const history = useHistory();
	const { user, token } = isAuthenticated();
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		loading: false,
		error: '',
		createdProduct: '',
		getRedirect: false,
		formData: '',
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		error,
		createdProduct,
		getRedirect,
		formData,
		photo,
		loading,
	} = values;

	const goBack = () => (
		<div className="mt-2">
			<Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
				Admin Dashboard
			</Link>
		</div>
	);

	const preloadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues((values) => ({
					...values,
					categories: data,
					formData: new FormData(),
				}));
				preload(match.params.productId);
			}
		});
	};
	const preload = (productId) => {
		getAProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues((values) => ({
					...values,
					name: data.name,
					price: data.price,
					description: data.description,
					stock: data.stock,
					category: data.category.name,
					formData: new FormData(),
				}));
			}
		});
	};

	useEffect(() => {
		preloadCategories();
		preload(match.params.productId);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: '', loading: true });
		updateAProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: '',
					description: '',
					price: '',
					photo: '',
					stock: '',
					loading: false,
					getRedirect: true,
					createdProduct: data.name,
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		const value =
			name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: createdProduct ? '' : 'none' }}
			>
				<h4>{createdProduct} created successfully</h4>
			</div>
		);
	};
	const errorMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: error ? '' : 'none' }}
			>
				<h4>Error occured</h4>
			</div>
		);
	};

	const createProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-info">
					<input
						onChange={handleChange('photo')}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('name')}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange('description')}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('price')}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange('category')}
					className="form-control"
					placeholder="Category"
				>
					<option>{category}</option>
					{categories &&
						categories.map((cat, index) => {
							if (cat.name !== category)
								return (
									<option value={cat._id} key={index}>
										{cat.name}
									</option>
								);
						})}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('stock')}
					type="number"
					className="form-control"
					placeholder="Quantity"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Create Product
			</button>
		</form>
	);

	return (
		<Base
			title="Add Product Here"
			description="Add a new item"
			className="container bg-info p-4"
		>
			{goBack()}
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{errorMessage()}
					{createProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
