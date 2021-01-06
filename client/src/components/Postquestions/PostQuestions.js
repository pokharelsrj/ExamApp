import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { postQuestion } from '../../actions/postQuestionAction';
import { logout } from '../../actions/authActionsTeacher';
import { Row, Col } from 'antd';
import { Button, Collapse, Radio, Divider } from 'antd';
const { Panel } = Collapse;
const PostQuestions = ({ postQuestion, error, logout }) => {
	const [test_name, setTestName] = useState('');
	const [no_of_questions, setNoOfQuestions] = useState(0);
	const [msg, setMsg] = useState(null);
	const [questions_pool, setQuestions] = useState([]);
	const [question, setQuestion] = useState('');
	const [option_a, setOptionA] = useState('');
	const [option_b, setOptionB] = useState('');
	const [option_c, setOptionC] = useState('');
	const [option_d, setOptionD] = useState('');
	const [correct_option, setCorrectOption] = useState('');

	const handleChangeTestName = (e) => setTestName(e.target.value);
	const handleNoOfQuestions = (e) => setNoOfQuestions(e.target.value);
	// const handleQuestions = (e) => setQuestions(e.target.value);
	const handleQuestion = (e) => setQuestion(e.target.value);
	const handleOptionA = (e) => setOptionA(e.target.value);
	const handleOptionB = (e) => setOptionB(e.target.value);
	const handleOptionC = (e) => setOptionC(e.target.value);
	const handleOptionD = (e) => setOptionD(e.target.value);
	const handleCorrectOption = (e) => setCorrectOption(e.target.value);

	const questionRef = useRef();
	const optionARef = useRef();
	const optionBRef = useRef();
	const optionCRef = useRef();
	const optionDRef = useRef();
	const correctOptionRef = useRef();

	const removeQuestion = (i) => {
		const updatedQuestions = questions_pool.filter((item, index) => {
			return index !== i;
		});

		setQuestions([...updatedQuestions]);
	};

	const questionValidation = () => {
		if (
			question.length === 0 ||
			option_a.length === 0 ||
			option_b.length === 0 ||
			option_c.length === 0 ||
			option_d.length === 0 ||
			correct_option.length === 0
		)
			return false;
		else return true;
	};
	const onAddQuestion = (e) => {
		e.preventDefault();

		if (questionValidation() === false) {
			setMsg('Enter all the fields');
		} else if (questions_pool.length > no_of_questions - 1) {
			setMsg(`The required no of question/s is ${no_of_questions}`);
		} else {
			const que = {
				question,
				option_a,
				option_b,
				option_c,
				option_d,
				correct_option,
			};
			setMsg('');
			setQuestions([...questions_pool, que]);
			questionRef.current.value = null;
			optionARef.current.value = null;
			optionBRef.current.value = null;
			optionCRef.current.value = null;
			optionDRef.current.value = null;
			correctOptionRef.current.value = null;
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (questions_pool.length != no_of_questions) {
			setMsg(`The required no of question/s is ${no_of_questions}`);
		} else if (no_of_questions === 0) {
			setMsg('Enter the no of questions');
		} else {
			const questions = {
				test_name,
				no_of_questions,
				questions_pool,
			};
			setMsg('');
			postQuestion(questions);
			window.location.reload();
		}
	};

	useEffect(() => {
		//Check forError
		if (error.id === 'QUESTION_POST_ERROR') {
			setMsg(error.msg);
		} else {
			setMsg(null);
		}
	}, [error]);

	return (
		<>
			<Divider orientation='left'>Create Test</Divider>
			<Row>
				<Col xs={12} sm={10} md={10} lg={12} xl={12}>
					<form onSubmit={handleOnSubmit}>
						<legend>Test Details</legend>
						<label for='test_name'>Name</label>
						<input
							type='text'
							name='test_name'
							id='test_name'
							placeholder='Test Name'
							onChange={handleChangeTestName}
							style={{
								marginLeft: '15px',
								marginBottom: '10px',
								marginRight: '35px',
							}}
						/>

						<label for='no_of_questions'>No of Questions</label>
						<input
							type='number'
							name='number_of_questions'
							id='number_of_questions'
							placeholder='No of Questions'
							onChange={handleNoOfQuestions}
							style={{ marginLeft: '15px', marginBottom: '10px' }}
						/>

						<Divider orientation='left'></Divider>
						<form>
							<legend>Enter Questions</legend>
							<label for='question'>Question</label>
							<input
								type='text'
								ref={questionRef}
								name='question'
								id='question'
								placeholder='Question'
								onChange={handleQuestion}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<label for='option_a'>Option A</label>
							<input
								type='text'
								ref={optionARef}
								name='option_a'
								id='option_a'
								placeholder='Option A'
								onChange={handleOptionA}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<label for='option_b'>Option B</label>
							<input
								type='text'
								ref={optionBRef}
								name='option_b'
								id='option_b'
								placeholder='Option B'
								onChange={handleOptionB}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<label for='option_c'>Option C</label>
							<input
								type='text'
								ref={optionCRef}
								name='option_c'
								id='option_c'
								placeholder='Option C'
								onChange={handleOptionC}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<label for='option_d'>Option D</label>
							<input
								type='text'
								ref={optionDRef}
								name='option_d'
								id='option_d'
								placeholder='Option D'
								onChange={handleOptionD}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<label for='correct_option'>Correct Option</label>
							<input
								type='text'
								ref={correctOptionRef}
								name='correct_option'
								id='correct_option'
								placeholder='Correct Option'
								onChange={handleCorrectOption}
								style={{ marginLeft: '15px', marginBottom: '10px' }}
							/>
							<br />
							<Button onClick={onAddQuestion}>Add Question</Button>
						</form>
						<Divider orientation='left'></Divider>
						{msg ? <h1 style={{ color: 'red' }}>{msg}</h1> : null}
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</form>
				</Col>
				<Col xs={14} sm={14} md={14} lg={12} xl={12}>
					<Collapse accordion>
						{questions_pool.map((item, index) => {
							return (
								<Panel header={`Question No ${index + 1}`} key={index}>
									<h1>{item.question}</h1>
									<Radio.Group name={index} buttonStyle='solid'>
										<Radio.Button value={option_a}>{option_a}</Radio.Button>
										<Radio.Button value={option_b}>{option_b}</Radio.Button>
										<Radio.Button value={option_c}>{option_c}</Radio.Button>
										<Radio.Button value={option_d}>{option_d}</Radio.Button>
										<Radio.Button value={correct_option}>
											Correct Answer
										</Radio.Button>
									</Radio.Group>
									<Button danger onClick={() => removeQuestion(index)}>
										Remove Question
									</Button>
								</Panel>
							);
						})}
					</Collapse>
				</Col>
			</Row>
		</>
	);
};
const mapStateToProps = (state) => ({
	auth: state.authtea,
	error: state.error,
});

export default connect(mapStateToProps, { postQuestion, logout })(
	PostQuestions
);
