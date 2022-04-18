/** @format */

import React from 'react';
import Menu from './Menu';

const Base = ({
	title = 'my title',
	description = 'desciption',
	className = 'bg-dark text-white p-4',
	children,
}) => (
	<div>
		<Menu />
		<div className="container-fluid">
			<div className="jumbotron bg-dark text-center text-white">
				<h2 className="display-4">{title}</h2>
				<p className="lead">{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>

		<footer className="footer bg-dark mt-auto py-3">
			<div className="container-fluid bg-success text-white text-center py-1">
				<h4>If you got any questions, feel free to reach out!</h4>
				<button className="btn btn-warning btn-lg">Contact Us</button>
			</div>
			<div className="container">
				<span className="text-muted text-center">
					Amaziing Place to by{' '}
					<span className="text-white">t-shirt</span>
				</span>
			</div>
		</footer>
	</div>
);

export default Base;
