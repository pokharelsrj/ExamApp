import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Questions from './Questions';
import { postresult } from '../../actions/postResultAction';
import { Collapse } from 'antd';
import { Row, Col, Divider, Button } from 'antd';
const { Panel } = Collapse;

function IndividualTestsStudent({ question, auth }) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const ques = question.filter((que) => que._id === id);
	const que = ques[0];
	var score = 0;
	const test_name = que.test_name;
	const no_of_questions = que.no_of_questions;
	const student_name = auth.user.name;
	const resultArr = [];
	const length = que.questions_pool.length;
	for (var i = 0; i < length; i++) {
		resultArr.splice(i, 0, 0);
	}

	const correctAnswer = (answer, index, correctOption) => {
		if (answer === correctOption && resultArr[index] === 1) {
			resultArr[index] = 1;
		} else if (answer === correctOption) {
			resultArr[index] = 1;
			console.log(resultArr[index]);
		} else {
			resultArr[index] = 0;
			console.log(resultArr[index]);
		}
	};

	const submitQuestion = (e) => {
		e.preventDefault();
		for (var i = 0; i < length; i++) {
			score += resultArr[i];
		}
		console.log(score);
		const marks = score;
		const result = {
			test_name,
			student_name,
			marks,
			no_of_questions,
		};

		dispatch(postresult(result));
		window.location.reload();
	};
	return (
		<Row>
			<Col span={2}></Col>
			<Col span={20}>
				<Divider orientation='left'>{que.test_name}</Divider>
				{/* <h1>Test name: {que.test_name}</h1> */}
				{/* <h2>No of Questions: {que.no_of_questions}</h2> */}

				<Collapse accordion>
					{que.questions_pool.map((que, index) => (
						<Panel header={`Question No ${index + 1}`}>
							<Questions
								key={que._id}
								question={que.question}
								option_a={que.option_a}
								option_b={que.option_b}
								option_c={que.option_c}
								option_d={que.option_d}
								correct_option={que.correct_option}
								index={index}
								selected={
									(answer, returnIndex) =>
										correctAnswer(answer, returnIndex, que.correct_option)
									// console.log(answer, returnIndex)
								}
							/>
						</Panel>
					))}
				</Collapse>
				<br />
				<Button type='primary' onClick={submitQuestion}>
					Submit Test
				</Button>
			</Col>
			<Col span={2}></Col>
		</Row>
	);
}
const mapStateToProps = (state) => ({
	question: state.postquestion,
	auth: state.auth,
});

export default connect(mapStateToProps)(IndividualTestsStudent);
