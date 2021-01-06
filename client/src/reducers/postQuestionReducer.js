import {
	QUESTION_LOADING,
	QUESTION_POSTED,
	QUESTION_POST_ERROR,
	QUESTION_LOADED,
	DELETE_QUESTIONS,
	LOAD_INDI_QUESTIONS,
} from '../actions/types';

/* const initialState = {
	isLoading: false,
	questions: null,
}; */

export default function (questions = [], action) {
	switch (action.type) {
		// case QUESTION_LOADING:
		/* return {
				...state,
				isLoading: true,
			}; */
		case QUESTION_LOADED:
			return action.payload;
		/* return {
				...state,
				isLoading: false,
				questions: action.payload,
			}; */
		case QUESTION_POSTED:
			return [...questions, action.payload];
		/* return {
				...state,
				...action.payload,
				isLoading: false,
			}; */

		case QUESTION_POST_ERROR:
			return null;
		/* return {
				...state,
				questions: null,
				isLoading: false,
			}; */
		case DELETE_QUESTIONS:
			return questions.filter((que) => que._id !== action.payload);
		/* return {
				...state,
				 questions.filter((que) => que._id !== action.payload),
			}; */
		case LOAD_INDI_QUESTIONS:
			return questions.filter((que) => que._id === action.payload);

		default:
			return questions;
	}
}
