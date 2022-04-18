/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteAProduct, getAllProducts } from './helper/adminapicall';

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const { user, token } = isAuthenticated();
	const preload = () => {
		getAllProducts().then((data) => {
			if (data.error) console.log(data.error);
			else setProducts(data);
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteProduct = (productID) => {
		deleteAProduct(productID, user._id, token).then((data) => {
			if (data.error) console.log(data.error);
			else preload();
		});
	};
	return (
		<Base title="Welcome admin" description="Manage products here">
			<h2 className="mb-4">All products:</h2>
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<div className="row">
				<div className="col-12 ">
					<h2 className="text-center text-white my-3">
						Total {products.length} products
					</h2>
					<div className="row">
						{products.map((product, index) => (
							<div key={index} className="col-4  mb-2 ">
								<div className="card">
									<h3 className="text-dark text-left card-header">
										{product.name}
									</h3>
									<ul className="list-group text-dark">
										<li className="list-group-item">
											<span className="badge badge-success">
												stock:{' '}
											</span>
											{' ' + product.stock}
										</li>
										<li className="list-group-item">
											<span className="badge badge-success mr-2">
												Price:{' '}
											</span>
											{' ' + product.price}
										</li>
										<li className="list-group-item">
											<span className="badge badge-success mr-2">
												Description:{' '}
											</span>
											{' ' + product.description}
										</li>
									</ul>
									<Link
										className="btn btn-success m-2 rounded-pill"
										to={`/admin/product/update/${product._id}`}
									>
										<span className="">Update</span>
									</Link>
									<button
										onClick={() => {
											deleteProduct(product._id);
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

export default ManageProducts;
