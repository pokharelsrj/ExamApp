import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteTeacher = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login/teacher', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.authtea,
	error: state.error,
});

export default connect(mapStateToProps)(PrivateRouteTeacher);
