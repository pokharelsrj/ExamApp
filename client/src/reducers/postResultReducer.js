import {
	RESULT_POSTED,
	RESULT_POST_ERROR,
	RESULT_LOADED,
} from '../actions/types';

export default function (result = [], action) {
	switch (action.type) {
		case RESULT_LOADED:
			return action.payload;
		case RESULT_POSTED:
			return [...result, action.payload];
		case RESULT_POST_ERROR:
			return null;
		default:
			return result;
	}
}
