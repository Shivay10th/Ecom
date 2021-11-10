/** @format */

import React from 'react';
import '../styles.css';
import { API } from '../backend';
import Base from './Base';

const Home = () => {
	console.log(API);

	return (
		<Base title="HomePage" description="passed description">
			<h1>Hello</h1>
		</Base>
	);
};

export default Home;
