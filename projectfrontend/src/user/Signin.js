/** @format */

import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		didRedirect: false,
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const redirectTo = () => {
		const user = isAuthenticated().user;
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({
							...values,
							didRedirect: true,
						});
					});
				}
			})
			.catch((err) => console.log('Error in Signin'));
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
	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading....</h2>
				</div>
			)
		);
	};

	const { email, password, error, loading, didRedirect } = values;

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form action="">
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								onChange={handleChange('email')}
								value={email}
								className="form-control"
								type="email"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange('password')}
								value={password}
								className="form-control"
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
		<Base title="Sign In page" description="User can sign in here.">
			{loadingMessage()}
			{errorMessage()}
			{signInForm()}
			{redirectTo()}
		</Base>
	);
};

export default Signin;
