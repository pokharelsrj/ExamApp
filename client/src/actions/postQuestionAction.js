import axios from 'axios';
import { returnErrors } from './errorActions';
import {
	QUESTION_POSTED,
	QUESTION_POST_ERROR,
	QUESTION_LOADED,
	DELETE_QUESTIONS,
	LOAD_INDI_QUESTIONS,
} from './types';

//load question
export const loadQuestion = () => async (dispatch) => {
	//Question loading
	// dispatch({ type: QUESTION_LOADING });

	await axios
		.get('/api/postquestions')
		.then((res) =>
			dispatch({
				type: QUESTION_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: QUESTION_POST_ERROR,
			});
		});
};

//Post
export const postQuestion = ({
	test_name,
	no_of_questions,
	questions_pool,
}) => async (dispatch) => {
	//Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({ test_name, no_of_questions, questions_pool });

	await axios
		.post('/api/postquestions', body, config)
		.then((res) =>
			dispatch({
				type: QUESTION_POSTED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					'QUESTION_POST_ERROR'
				)
			);
			dispatch({
				type: QUESTION_POST_ERROR,
			});
		});
};

export const deleteQuestions = (id) => async (dispatch) => {
	await axios
		.delete(`/api/postquestions/delete/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_QUESTIONS,
				payload: id,
			})
		)
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'DELETE_ERROR')
			);
		});
};

export const loadIndiQuestions = (id) => async (dispatch) => {
	await axios
		.get(`/api/postquestions/test/${id}`)
		.then((res) =>
			dispatch({
				type: LOAD_INDI_QUESTIONS,
				payload: id,
			})
		)
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					'LOAD_INDI_QUESTIONS'
				)
			);
		});
};
