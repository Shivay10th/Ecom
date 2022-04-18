/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { updateCategory } from './helper/adminapicall';

const UpdateCategory = ({ match }) => {
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
	};

	const handleClick = (event) => {
		event.preventDefault();
		setError('');
		setSuccess(false);

		//backend api
		updateCategory(match.params.categoryId, user._id, token, { name }).then(
			(data) => {
				console.log(data);
				if (data.error) {
					setError(data.error);
				} else {
					setSuccess(true);
					setError(false);
					setName('');
				}
			},
		);
	};
	const goBack = () => (
		<div className="mt-2">
			<Link className="btn btn-md btn-dark mb-3" to="/admin/categories">
				Back
			</Link>
		</div>
	);
	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: success ? '' : 'none' }}
			>
				<h4>{name} updated successfully</h4>
			</div>
		);
	};
	const errorMessage = () => {
		console.log(error);
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: error ? '' : 'none' }}
			>
				<h4>Error occured</h4>
			</div>
		);
	};

	const updateCategoryForm = () => (
		<form action="">
			<div className="form-group">
				<p className="lead">Enter Category</p>
				<input
					type="text"
					className="form-control my-3"
					onChange={handleChange}
					value={name}
					autoFocus
					required
					placeholder="category name"
				/>
				<button onClick={handleClick} className="btn btn-outline-info">
					Update
				</button>
			</div>
		</form>
	);
	return (
		<Base
			title="Update Category"
			description=""
			className="container bg-info p-4"
		>
			{goBack()}
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{errorMessage()}
					{successMessage()}
					{updateCategoryForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
