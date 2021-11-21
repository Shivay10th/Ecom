/** @format */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminDashboard from './user/AdminDashBoard';
import UserDashboard from './user/UserDashBoard';
const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
				<PrivateRoute
					path="/user/dashboard"
					exact
					component={UserDashboard}
				/>
				<AdminRoute
					path="/admin/dashboard"
					exact
					component={AdminDashboard}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
