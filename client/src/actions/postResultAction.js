import axios from 'axios';
import { returnErrors } from './errorActions';
import { RESULT_POSTED, RESULT_LOADED } from './types';

//Post
export const postresult = ({
	test_name,
	student_name,
	marks,
	no_of_questions,
}) => async (dispatch) => {
	//Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	//Request Body
	const body = JSON.stringify({
		test_name,
		student_name,
		marks,
		no_of_questions,
	});

	await axios
		.post('/api/postresult', body, config)
		.then((res) =>
			dispatch({
				type: RESULT_POSTED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					'RESULT_POST_ERROR'
				)
			);
		});
};

export const loadresult = () => async (dispatch) => {
	await axios
		.get('/api/postresult')
		.then((res) =>
			dispatch({
				type: RESULT_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};
