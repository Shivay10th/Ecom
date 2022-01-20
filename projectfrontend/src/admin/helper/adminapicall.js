/** @format */

import { API } from '../../backend';

// Category calls
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((res) => res.json())
		.catch(console.log);
};

//get categories
export const getCategories = () => {
	return fetch(`${API}/categories`, { method: 'GET' })
		.then((res) => res.json())
		.catch(console.log);
};

// Products call

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch(console.log);
};

export const getAllProducts = () => {
	return fetch(`${API}/products`, { method: 'GET' })
		.then((res) => res.json())
		.catch(console.log);
};
