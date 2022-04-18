/** @format */

import { API } from '../../backend';

//get all products
export const getAllProducts = () => {
	return fetch(`${API}/products`, { method: 'GET' })
		.then((res) => res.json())
		.catch(console.log);
};
