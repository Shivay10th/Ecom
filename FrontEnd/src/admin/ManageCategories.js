/** @format */

import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { deleteACategory, getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
const ManageCategories = () => {
	const [categories, setCategories] = useState([]);
	const { user, token } = isAuthenticated();

	const preload = () => {
		getCategories().then((data) => {
			if (data.error) console.log(data.error);
			else setCategories(data);
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteCategory = (categoryId) => {
		deleteACategory(categoryId, user._id, token).then((data) => {
			if (data.error) console.log(data.error);
			else preload();
		});
	};
	return (
		<Base title="Welcome admin" description="Manage products here">
			<h2 className="mb-4">Categories:</h2>
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<div className="row">
				<div className="col-12 ">
					<h2 className="text-center text-white my-3">
						Total {categories.length} Categories
					</h2>
					<div className="row">
						{categories.map((category, index) => (
							<div key={index} className="col-2  mb-2 ">
								<div className="card">
									<h3 className="text-dark text-left card-header">
										{category.name}
									</h3>

									<Link
										className="btn btn-success m-2 rounded-pill"
										to={`/admin/category/update/${category._id}`}
									>
										<span className="">Update</span>
									</Link>
									<button
										onClick={() => {
											deleteCategory(category._id);
										}}
										className="btn btn-danger m-2 rounded-pill"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageCategories;
