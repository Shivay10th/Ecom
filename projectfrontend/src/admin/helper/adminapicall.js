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

//update category
export const updateCategory = (categoryId, userId, token, category) => {
	console.log(category);
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'PUT',
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

//delete category
export const deleteACategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch(console.log);
};
// Products call

//create product
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

//get all products
export const getAllProducts = () => {
	return fetch(`${API}/products`, { method: 'GET' })
		.then((res) => res.json())
		.catch(console.log);
};

// get a product
export const getAProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, { method: 'GET' })
		.then((res) => res.json())
		.catch(console.log);
};

//update a product
export const updateAProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch(console.log);
};

//delete a product
export const deleteAProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch(console.log);
};
