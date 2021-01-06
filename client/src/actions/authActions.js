import axios from 'axios';
import { returnErrors } from './errorActions';
import { Redirect } from 'react-router-dom';

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ERRORS,
} from './types';

//Check token & load user
export const loadUser = () => async (dispatch, getState) => {
	//User loading
	dispatch({ type: USER_LOADING });

	await axios
		.get('/api/authStudent/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
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
		.post('/api/userStudent', body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			<Redirect to={{ pathname: '/student' }} />;
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
			);
			dispatch({
				type: REGISTER_FAIL,
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
		.post('/api/authStudent', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: CLEAR_ERRORS,
			});
			<Redirect to={{ pathname: '/student' }} />;
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
			);
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

//Logout User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

//Setup config/headers in token

export const tokenConfig = (getState) => {
	//Get token from local storage
	const token = getState().auth.token;

	//Headers
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	//If token, add to headers

	if (token) {
		config.headers['auth-token'] = token;
	}

	return config;
};
