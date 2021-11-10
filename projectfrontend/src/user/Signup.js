/** @format */

import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/helper';
import { Link } from 'react-router-dom';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
	});
	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		console.log('in');
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
					console.log(values);
				} else {
					setValues({
						...values,
						name: '',
						email: '',
						password: '',
						error: '',
						success: true,
					});
				}
			})
			.catch((err) => console.log('Error in signup route'));
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? '' : 'none' }}
					>
						Welcome. Please <Link to="/signin">Login here.</Link>
					</div>
				</div>
			</div>
		);
	};
	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? '' : 'none' }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form action="">
						<div className="form-group">
							<label className="text-light">Name</label>
							<input
								onChange={handleChange('name')}
								className="form-control"
								value={name}
								type="text"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								onChange={handleChange('email')}
								className="form-control"
								value={email}
								type="email"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange('password')}
								className="form-control"
								value={password}
								type="password"
							/>
						</div>
						<div
							onClick={onSubmit}
							className="btn btn-success btn-block"
						>
							Submit
						</div>
					</form>
				</div>
			</div>
		);
	};
	return (
		<Base title="Sign up page" description="User can sign up here.">
			{successMessage()}
			{errorMessage()}
			{signUpForm()}
		</Base>
	);
};

export default Signup;
