import React, { useState } from 'react';
import { Radio, Button } from 'antd';

const Questions = ({
	key,
	question,
	option_a,
	option_b,
	option_c,
	option_d,
	selected,
	index,
}) => {
	const [answer, setAnswer] = useState('');

	const onAnswerChange = (e) => {
		setAnswer(e.target.value);
	};
	const submitAnswers = (e) => {
		e.preventDefault();

		selected(answer, index);
	};
	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
	};
	return (
		<div key={key}>
			<h1>{question}</h1>

			<Radio.Group name={`${key}`}>
				<Radio style={radioStyle} value={option_a} onChange={onAnswerChange}>
					{option_a}
				</Radio>
				<Radio style={radioStyle} value={option_b} onChange={onAnswerChange}>
					{option_b}
				</Radio>
				<Radio style={radioStyle} value={option_c} onChange={onAnswerChange}>
					{option_c}
				</Radio>
				<Radio style={radioStyle} value={option_d} onChange={onAnswerChange}>
					{option_d}
				</Radio>
			</Radio.Group>
			<br />
			<br />
			<Button onClick={submitAnswers}>Submit Answer</Button>
		</div>
	);
};

export default Questions;
