import {
	USER_LOADED_TEACHER,
	USER_LOADING_TEACHER,
	AUTH_ERROR_TEACHER,
	LOGIN_SUCCESS_TEACHER,
	LOGIN_FAIL_TEACHER,
	LOGOUT_SUCCESS_TEACHER,
	REGISTER_SUCCESS_TEACHER,
	REGISTER_FAIL_TEACHER,
} from '../actions/types';

const initialState = {
	tokentea: localStorage.getItem('tokentea'),
	isAuthenticated: null,
	isLoading: false,
	user: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING_TEACHER:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED_TEACHER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};

		case LOGIN_SUCCESS_TEACHER:
		case REGISTER_SUCCESS_TEACHER:
			localStorage.setItem('tokentea', action.payload.tokentea);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR_TEACHER:
		case LOGIN_FAIL_TEACHER:
		case LOGOUT_SUCCESS_TEACHER:
		case REGISTER_FAIL_TEACHER:
			localStorage.removeItem('tokentea');

			return {
				...state,
				tokentea: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
}
