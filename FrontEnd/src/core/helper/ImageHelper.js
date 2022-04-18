/** @format */

import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
	const imageurl = product
		? `${API}/product/photo/${product._id}`
		: `https://images.unsplash.com/photo-1471874276752-65e2d717604a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80`;
	return (
		<div className="rounded border border-success p-2">
			<img
				alt="Product "
				src={imageurl}
				style={{ maxHeight: '200px', maxWidth: '100%' }}
				className="mb-3 rounded"
			/>
		</div>
	);
};

export default ImageHelper;
