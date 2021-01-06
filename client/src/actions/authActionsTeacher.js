import axios from 'axios';
import { returnErrors } from './errorActions';
import { Redirect } from 'react-router-dom';

import {
	USER_LOADED_TEACHER,
	USER_LOADING_TEACHER,
	AUTH_ERROR_TEACHER,
	LOGIN_FAIL_TEACHER,
	LOGOUT_SUCCESS_TEACHER,
	REGISTER_FAIL_TEACHER,
	REGISTER_SUCCESS_TEACHER,
	LOGIN_SUCCESS_TEACHER,
	CLEAR_ERRORS,
} from './types';

//Check token & load user
export const loadUserteacher = () => async (dispatch, getState) => {
	//User loading

	dispatch({ type: USER_LOADING_TEACHER });

	await axios
		.get('/api/authTeacher/userteacher', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED_TEACHER,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR_TEACHER,
			});
		});
};

//Register User
export const register = ({
	name,
	email,
	password,
	address,
	contact_number,
	date_of_birth,
}) => async (dispatch) => {
	//Headers

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({
		name,
		email,
		password,
		address,
		contact_number,
		date_of_birth,
	});

	await axios
		.post('/api/userTeacher', body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS_TEACHER,
				payload: res.data,
			});
			<Redirect to={{ pathname: '/teacher' }} />;
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
			);
			dispatch({
				type: REGISTER_FAIL_TEACHER,
			});
		});
};

//Login User

export const login = ({ email, password }) => async (dispatch) => {
	//Headers

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({ email, password });

	await axios
		.post('/api/authTeacher', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS_TEACHER,
				payload: res.data,
			});
			dispatch({
				type: CLEAR_ERRORS,
			});
			<Redirect to={{ pathname: '/teacher' }} />;
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
			);
			dispatch({
				type: LOGIN_FAIL_TEACHER,
			});
		});
};

//Logout User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS_TEACHER,
	};
};

//Setup config/headers in token

export const tokenConfig = (getState) => {
	//Get token from local storage
	const tokentea = getState().authtea.tokentea;

	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	//If token, add to headers

	if (tokentea) {
		config.headers['auth-tokentea'] = tokentea;
	}

	return config;
};
