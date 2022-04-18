/** @format */

import React, { useEffect, useState } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProducts = () => {
		getAllProducts().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				console.log(data);
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);
	return (
		<Base title="HomePage" description="passed description">
			<h1 className="text-white">All Products</h1>
			<div className="row text-center">
				{products.map((product, index) => {
					return (
						<div className="col-4 mb-4" key={index}>
							<Card product={product} />
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Home;
